const redis = require("../config/redis");

class RedisService {
  // Cache Operations
  static async getCache(key) {
    if (redis.isConnected()) {
      try {
        const client = redis.getRedis();
        const data = await client.get(key);
        return data ? JSON.parse(data) : null;
      } catch (err) {
        console.warn(`[Redis Cache] Failed to get "${key}": ${err.message}`);
      }
    }

    // In-Memory Fallback
    const cached = redis.inMemoryCache.get(key);

    if (!cached) return null;

    if (cached.expiresAt < Date.now()) {
      redis.inMemoryCache.delete(key);
      return null;
    }

    return cached.value;
  }

  static async setCache(key, value, ttlSeconds = 60) {
    if (redis.isConnected()) {
      try {
        const client = redis.getRedis();

        await client.set(
          key,
          JSON.stringify(value),
          {
            EX: ttlSeconds,
          }
        );

        return true;
      } catch (err) {
        console.warn(`[Redis Cache] Failed to set "${key}": ${err.message}`);
      }
    }

    // In-Memory Fallback
    redis.inMemoryCache.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });

    return true;
  }

  static async delCache(key) {
    if (redis.isConnected()) {
      try {
        const client = redis.getRedis();
        await client.del(key);
      } catch (err) {
        console.warn(`[Redis Cache] Failed to delete "${key}": ${err.message}`);
      }
    }

    redis.inMemoryCache.delete(key);
  }

  static async clearMedicineCache() {
    if (redis.isConnected()) {
      try {
        const client = redis.getRedis();

        const keys = await client.keys("medicines_list:*");

        if (keys.length > 0) {
          await client.del(keys);
        }
      } catch (err) {
        console.warn(
          `[Redis Cache] Failed to clear medicine cache: ${err.message}`
        );
      }
    }

    for (const key of redis.inMemoryCache.keys()) {
      if (key.startsWith("medicines_list:")) {
        redis.inMemoryCache.delete(key);
      }
    }
  }
  // Lock Operations
  static async acquireLock(lockKey, ttlMs = 5000) {
    if (redis.isConnected()) {
      try {
        const client = redis.getRedis();

        const result = await client.set(
          `lock:${lockKey}`,
          "LOCKED",
          {
            NX: true,
            PX: ttlMs,
          }
        );

        return result === "OK";
      } catch (err) {
        console.warn(
          `[Redis Lock] Failed to acquire "${lockKey}": ${err.message}`
        );
      }
    }

    // In-Memory Lock Fallback
    if (redis.inMemoryLocks.has(lockKey)) {
      return false;
    }

    redis.inMemoryLocks.add(lockKey);

    setTimeout(() => {
      redis.inMemoryLocks.delete(lockKey);
    }, ttlMs);

    return true;
  }

  static async releaseLock(lockKey) {
    if (redis.isConnected()) {
      try {
        const client = redis.getRedis();
        await client.del(`lock:${lockKey}`);
      } catch (err) {
        console.warn(
          `[Redis Lock] Failed to release "${lockKey}": ${err.message}`
        );
      }
    }

    redis.inMemoryLocks.delete(lockKey);
  }
}

module.exports = RedisService;