const express = require("express");
const Post = require("../models/postModel");
const User = require("../models/userModel");
//const Comment = require("../models/commentModel");

const auth = require("../middleware/auth");
const router = new express.Router();

//create posts
router.post("/posts", auth, async (req, res) => {
  const { content, image } = req.body;

  const post = new Post({
    content,
    image,
    user: req.user._id,
  });

  if (!content && !image) {
    res.status(422).send({ error: "No content or image" });
  } else {
    try {
      await post.save();
      req.user.posts.push(post._id);
      await req.user.save();
      res.status(201).send(post);
    } catch (e) {
      res.status(400).send(e);
    }
  }
});

router.get("/posts/:id", auth, async (req, res) => {
  const _id = req.params.id;
  console.log(_id);

  try {
    const post = await Post.findOne({ _id, user: req.user._id });
    console.log(post.user);

    if (!post) {
      return res.status(404).send();
    }

    res.send(post);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/posts", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    await user.populate("posts").execPopulate();
    return res.send(user.posts);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete("/posts/:id", auth, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!post) {
      res.status(404).send();
    }

    res.send(post);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/posts/:id/comment", auth, async (req, res) => {
  const content = req.body.content;
  const id = req.params.id;

  const comment = new Comment({
    content,
    user: req.user._id,
  });

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).send();
    }
    await comment.save();

    post.comments.push(comment);
    await post.save();

    return res.status(201).send(comment);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/comments/:postid", auth, async (req, res) => {
  const id = req.params.postid;
  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).send();
    }
    await post.populate("comments").execPopulate();

    return res.send(post.comments);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete("/posts/comment/:commentid", auth, async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({
      _id: req.params.commentid,
      user: req.user._id,
    });
    console.log(comment);

    if (!comment) {
      return res.status(404).send();
    }

    res.send("Comment deleted");
  } catch (e) {
    res.status(500).send();
  }
});

router.put("/posts/like", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.body.id);

    if (!post) {
      return res.status(404).send("Post does not exists");
    }

    if (!post.likes.includes(req.user._id)) {
      post.likes.push(req.user._id);

      req.user.liked_posts.push(post._id);
      console.log(req.user.liked_posts);
      console.log(post.likes);

      res.send("Post liked");
    } else {
      let index = post.likes.indexOf(req.user._id);
      post.likes.splice(index, 1);
      console.log(post.likes);
      index = req.user.liked_posts.indexOf(post._id);
      req.user.liked_posts.splice(index, 1);
      console.log(req.user.liked_posts);

      res.send("Post unliked");
    }

    await post.save();
    await req.user.save();
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/feed", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    await user
      .populate({
        // get friends posts
        path: "connections",
        populate: {
          path: "posts",
          model: "Post",
        },
      })
      .populate("posts")
      .execPopulate(); // get current users posts

    console.log(user.posts);
    return res.send(user.posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
