import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';

dotenv.config();

// This will automatically read the UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN from your .env file
const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(20, '60 s') // 20 requests from an IP in 60 seconds
});

export default ratelimit;