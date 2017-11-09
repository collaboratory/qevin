local val = redis.call('zrange', 'queue:jobs:pending', 0, -1)
if val then
  for key,value in pairs(val) do
    local job = redis.call('GET', 'queue:job:' .. value)
    if job then
      local obj = cjson.decode(job)
      if obj.type == KEYS[1] then 
        obj.status = "active"
        obj.started_at = tonumber(KEYS[2])
        local res = cjson.encode(obj)
        redis.call('set', 'queue:job:' .. value, res)
        redis.call('zrem', 'queue:jobs:pending', value)
        redis.call('zadd', 'queue:jobs:active', 1, value)
        return res
      end
    end
  end
end
return false