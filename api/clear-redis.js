import { Redis } from '@upstash/redis';
const redis = Redis.fromEnv();

export default async function handler(req, res) {
    try {
        // Get all keys from Redis (WARNING: avoid in production with large datasets)
        let number = 0;
        const keys = await redis.keys('*');
        console.log('All keys:', keys);
        for (const key of keys) {
            await redis.del(key);
            console.log(`Deleted list with key: ${key}`);
            number += 1 ;
        }
        return res.json(number);
    } catch (error) {
        console.error('Error retrieving keys:', error);
    }
}

