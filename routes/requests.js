const express = require("express");
const router = express.Router();
const requests = require("../controllers/requests");

router.get("/form_add_request", requests.form_add_request);
router.get("/list_requests", requests.list_requests);
router.post("/add_requests", requests.requests_create_post);


module.exports = router;
