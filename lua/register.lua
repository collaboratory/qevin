local id = redis.call('get', 'queue:index');
local job = cjson.decode(KEYS[1]);
if id then
  job.id = id + 1;
else
  job.id = 0;
end

local res = cjson.encode(job);
redis.call('set', 'queue:job:' .. job.id, res);
redis.call('zadd', 'queue:jobs:pending', 1, job.id);
redis.call('set', 'queue:index', job.id);
return res;