const router = require("express").Router();
const multer = require("multer");
const SignupUser = require("../controllers/Auth/Signup");
const LoginUser = require("../controllers/Auth/Login");
const Logout = require("../controllers/Auth/Logout");
const ChangePassword = require("../controllers/Auth/ChangePassword");

const authRequired = require("../middleware/AuthRequired");

const storage=multer.memoryStorage({
  destination:function(req, file, callback){
    // path for temporary folder to store the image temporarily.
    callback(null, '');
  }
})

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    
    cb(undefined, true);
  },
  storage: storage
});

router.post("/signup", upload.single("profile_pic"), SignupUser);
router.post("/login", LoginUser);
router.get("/logout", authRequired, Logout);

router.put("/update_password", authRequired, ChangePassword);
module.exports = router;
