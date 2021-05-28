module.exports = {
  port: {
    type: Number,
    value: process.env.PORT,
  },
  redis: {
    type: "JSON",
    value: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
    },
  },
  apiAddress: {
    type: String,
    value: process.env.API_ADDRESS,
  },
};
