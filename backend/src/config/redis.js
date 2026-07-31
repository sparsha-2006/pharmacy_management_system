const { createClient } = require("redis");

let redisClient = null;
let isRedisConnected = false;

// In-memory fallback
const inMemoryCache = new Set();
const inMemoryLocks = new Set();

const connectRedis = async () => {
  try {
    redisClient = createClient({
      url: `redis://${process.env.REDIS_HOST || "127.0.0.1"}:${
        process.env.REDIS_PORT || 6379
      }`,
      password: process.env.REDIS_PASSWORD || undefined,
    });

    redisClient.on("connect", () => {
      console.log("✅ Redis Connected");
      isRedisConnected = true;
    });

    redisClient.on("ready", () => {
      console.log("🚀 Redis Ready");
    });

    redisClient.on("error", (err) => {
      // Print only one warning if Redis was never connected
      if (isRedisConnected) {
        console.error("❌ Redis Connection Lost:", err.message);
      }
      isRedisConnected = false;
    });

    await redisClient.connect();
  } catch (err) {
    console.warn("⚠️ Redis is not running.");
    console.warn("⚠️ Using In-Memory Cache & Lock Fallback.");
    redisClient = null;
    isRedisConnected = false;
  }
};

const getRedis = () => redisClient;

const isConnected = () => isRedisConnected;

module.exports = {
  connectRedis,
  getRedis,
  isConnected,
  inMemoryCache,
  inMemoryLocks,
};