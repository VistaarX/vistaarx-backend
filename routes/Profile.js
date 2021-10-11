const router = require("express").Router();
const {
  createManu,
  addproduct,
  catalogue,
  createorder,
  getmycompanyprofile,
  getprofilebyId,
  getordersbyprofile,
  getuserorders,
  getproducts,
  getprofiles,
} = require("../controllers/Profile/Profile");
const authRequired = require("../middleware/AuthRequired");

router.post("/createmanu", authRequired, createManu);
router.post("/addproduct/:id", authRequired, addproduct);
router.get("/catalogue/:id", catalogue);
router.get("/createorder/:productid", authRequired, createorder);
router.get("/getmycompanyprofile/", authRequired, getmycompanyprofile);
router.get("/getprofile/:profileid", authRequired, getprofilebyId);
router.get("/getorderbyprofile/:profileid", getordersbyprofile);
router.get("/getuserorders", authRequired, getuserorders);
router.get("/getproducts", authRequired, getproducts);
router.get("/getprofiles", authRequired, getprofiles);

module.exports = router;
