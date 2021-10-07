const router = require("express").Router();
const {
  createManu,
  addproduct,
  catalogue,
  createorder,
  getprofile,
} = require("../controllers/Profile/Profile");
const authRequired = require("../middleware/AuthRequired");

router.post("/createmanu", authRequired, createManu);
router.post("/addproduct/:id", authRequired, addproduct);
router.get("/catalogue/:id", catalogue);
router.get("/createorder/:id", authRequired, createorder);
router.get("/getprofile/:id", getprofile);
module.exports = router;
