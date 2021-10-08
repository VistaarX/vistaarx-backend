const router = require("express").Router();
const {
  createManu,
  addproduct,
  catalogue,
  createorder,
  getmycompanyprofile,
  getprofilebyId,
} = require("../controllers/Profile/Profile");
const authRequired = require("../middleware/AuthRequired");

router.post("/createmanu", authRequired, createManu);
router.post("/addproduct/:id", authRequired, addproduct);
router.get("/catalogue/:id", catalogue);
router.get("/createorder/:id", authRequired, createorder);
router.get("/getmycompanyprofile/", authRequired, getmycompanyprofile);
router.get("/getprofile/:profileid", authRequired, getprofilebyId);
module.exports = router;
