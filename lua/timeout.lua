local val = redis.call('zrange', 'queue:jobs:active', 0, -1)
local result = 0
if val then
  for key,value in pairs(val) do
    local job = redis.call('GET', 'queue:job:' .. value)
    if job then
      local obj = false

      local status, exception = pcall(function()
        obj = cjson.decode(job)
      end)

      if not status then
        redis.call('zrem', 'queue:jobs:active', value)
        redis.call('zadd', 'queue:jobs:failed', 1, value)
        return false
      end

      if obj then
        local timeout = tonumber(obj.timeout)
        local start_time = tonumber(obj.started_at)
        local end_time = start_time + timeout
        local now = tonumber(KEYS[1])
        if obj.status == "active" 
          and timeout
          and start_time 
          and end_time < now
        then
          if obj.retries > 0 then
            obj.status = "pending"
            obj.retries = obj.retries - 1
            obj.started_at = now
          else
            obj.status = "failed"
            obj.failed_at = now
          end

          local res = cjson.encode(obj)
          redis.call('set', 'queue:job:' .. value, res)
          redis.call('zrem', 'queue:jobs:active', value)
          redis.call('zadd', 'queue:jobs:' .. obj.status, 1, value)
          result = result + 1
        end
      end
    end
  end
end
return result 