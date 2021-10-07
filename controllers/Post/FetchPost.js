const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
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
  let page = parseInt(req.query.page || 0);
  let limit = 3;

  try {
    const user = await User.findById(req.userId);

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

      .execPopulate();

    let postsData = posts.map((post) => FilterPostData(user.posts));
    res.status(200).json({ posts: postsData });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
