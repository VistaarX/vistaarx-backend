const router = require("express").Router();
const {
  createManu,
  addproduct,
  catalogue,
} = require("../controllers/Profile/Profile");
const authRequired = require("../middleware/AuthRequired");

router.post("/createmanu", authRequired, createManu);
router.post("/addproduct/:id", authRequired, addproduct);
router.get("/catalogue/:id", catalogue);

module.exports = router;
