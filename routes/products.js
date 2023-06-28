const express = require("express");
const router = express.Router();
const products = require("../controllers/products");

router.get("/form_add_product", products.form_add_product);
router.get("/list_products", products.list_products);
router.post("/add_products", products.products_create_post);

module.exports = router;
