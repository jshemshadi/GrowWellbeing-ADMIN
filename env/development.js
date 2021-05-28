module.exports = {
  port: {
    type: Number,
    value: process.env.PORT || "8001",
  },
  redis: {
    type: "JSON",
    value: {
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: process.env.REDIS_PORT || "6379",
      pass: process.env.REDIS_PASSWORD || "",
    },
  },
  apiAddress: {
    type: String,
    value: process.env.API_ADDRESS || "http://localhost:8000",
  },
};
