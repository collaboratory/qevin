redis.call('zrem', 'queue:jobs:active', KEYS[1]);
redis.call('zrem', 'queue:jobs:pending', KEYS[1]);
if tonumber(KEYS[2]) == 1 then
  redis.call('del', 'queue:job:' .. KEYS[1])
else
  redis.call('zadd', 'queue:jobs:failed', 1, KEYS[1]);
end
return true;