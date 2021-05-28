const express = require("express");

const router = express.Router();
const controllers = require("../controllers");

router.post("/*", async (req, res) => {
  const paths = req.path.split("/");
  const controller = paths[1];
  const method = paths[2];

  const result = await controllers[controller][method](req.body, req.headers);

  res.send(result);
});

module.exports = router;
