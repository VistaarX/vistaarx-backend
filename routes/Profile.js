const router = require("express").Router();
const { createManu, addproduct } = require("../controllers/Profile/Profile");
const authRequired = require("../middleware/AuthRequired");

router.post("/createmanu", authRequired, createManu);
router.post("/addproduct/:id", authRequired, addproduct);

module.exports = router;
