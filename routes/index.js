const express = require("express");

const router = express.Router();

router.get(/\/(.)*/, (req, res) => {
  res.render("index", {
    title: "Grow Wellbeing - Admin Panel",
  });
});

module.exports = router;
