local options = cjson.decode(KEYS[1])

local list = redis.call('zrange', 'queue:jobs:' .. options.type, 0, -1);
local res = {}
for key, value in pairs(list) do
  local job = redis.call('get', 'queue:job:' .. value)
  if job then
    local obj = cjson.decode(job)
    table.insert(res, obj)
  end
end

local slice = function(tbl, first, last, step)
  local sliced = {}
  for i = first or 1, last or #tbl, step or 1 do
    sliced[#sliced+1] = tbl[i]
  end
  return sliced
end

for field, dir in pairs(options.sorting) do
  table.sort(res, function(a, b)
    local aVal = tonumber(a[field])
    local bVal = tonumber(a[field])

    if dir == "asc" then
      return aVal < bVal
    else
      return aVal > bVal
    end
  end)
end

local page = tonumber(options.page)
local pageSize = tonumber(options.pageSize)

if (pageSize == nil or pageSize == -1) then
  return cjson.encode(res)
end

local start = (page * pageSize)
local stop = ((page + 1) * pageSize)
return cjson.encode(slice(res, start, stop))