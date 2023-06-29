const express = require("express");
const router = express.Router();
const register = require("../controllers/register");

router.post("/", register.user_create_post);

module.exports = router;
