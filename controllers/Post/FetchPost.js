const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const User = require("../../models/User");
const FilterPostData = require("../../utils/FilterPostData");

exports.fetchPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate("user")
      .populate("likes");

    let postData = FilterPostData(post);

    res.status(200).json({ post: postData });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.feed = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate({
      // get friends posts
      path: "connections",
      populate: {
        path: "posts",
        model: "Post",
      },
      select: "posts",
    });
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    console.log(user.connections);
    res.status(200).json(user.connections);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
