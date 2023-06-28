const express = require('express');
const router = express.Router();
const customers = require("../controllers/customers");

router.get("/", customers.list_costumers);

module.exports = router;
