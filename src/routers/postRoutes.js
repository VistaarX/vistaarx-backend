const auth = require("../middleware/auth");
const postCtrl = require("../controller/postController");
const router = new express.Router();

//create posts
router.post("/posts", auth, postCtrl.createpost);

router.get("/posts/:id", auth, postCtrl.findpost);

router.get("/posts", auth, postCtrl.getposts);

router.delete("/posts/:id", auth, postCtrl.deletepost);

// router.post("/posts/:id/comment", auth, postCtrl.

// router.delete("/posts/comment/:commentid", auth,

router.put("/posts/like", auth, postCtrl.likepost);

router.get("/feed", auth, postCtrl.feed);

module.exports = router;
