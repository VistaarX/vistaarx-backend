const router = require("express").Router();
const { createManu } = require("../controllers/Profile/Profile");
const authRequired = require("../middleware/AuthRequired");

router.post("/createmanu", authRequired, createManu);

module.exports = router;
