const express = require("express");
const router = express.Router();
const customers = require("../controllers/customers");

router.get("/form_add_client_view", customers.form_add_client_view);
router.post("/add_client", customers.client_create_post);
router.get("/list_customers", customers.list_costumers);

module.exports = router;
