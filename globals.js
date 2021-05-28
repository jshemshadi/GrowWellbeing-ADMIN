const redis = require("redis");
const session = require("express-session");
const redisStore = require("connect-redis")(session);
const _ = require("lodash");

module.exports = (app) => {
  global._ = _;
  global.env = require("./env");
  global.utils = require("./utils.js");
};
