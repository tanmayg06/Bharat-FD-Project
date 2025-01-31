import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL || 'redis://127.0.0.1:6379'
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});
await client.connect();

export async function cacheFAQs(req, res, next) {
  const lang = req.query.lang || 'en';
  const cacheKey = `faqs_${lang}`;

  try {
    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }
    next();
  } catch (error) {
    console.error('Cache fetch error:', error);
    next();
  }
}

export async function setCache(key, data) {
  try {
    // Cache expires in 3600 seconds (1 hour)
    await client.setEx(key, 3600, JSON.stringify(data));
  } catch (error) {
    console.error('Cache set error:', error);
  }
}
