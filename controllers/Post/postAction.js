const User = require("../../models/User");
const Post = require("../../models/Post");
const FilterPostData = require("../../utils/FilterPostData");
const sendDataToFriends = require("../../utils/socket/SendDataToFriend");
exports.createPost = async (req, res) => {
  let { content, image } = req.body;

  if (!content && content.trim().length === 0 && !image) {
    return res.status(422).json({
      error:
        "Post Image or Write Some Content  to Post. Can`t upload empty post",
    });
  }
  try {
    const createPost = new Post({
      image,

      content,
      user: req.userId,
    });

    const user = await User.findById(req.userId);
    user.posts.push(createPost);
    await user.save();
    const savePost = await createPost.save();

    const post = await Post.findById(savePost.id).populate("user");
    const postData = FilterPostData(post);

    res
      .status(201)
      .json({ message: "post created successfully", post: postData });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.likeDislikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate("user")
      .populate({ path: "body.with", select: "_id name" });
    if (!post) {
      return res.status(404).json({ error: "post not found" });
    }

    let postData;

    const index = post.likes.indexOf(req.userId);
    if (index !== -1) {
      post.likes.splice(index, 1);
      await post.save();
      postData = FilterPostData(post);
      res.status(200).json({ message: "removed likes", post: postData });
      await sendDataToFriends({ req, key: "post-like-change", data: postData });
      return;
    }

    post.likes.push(req.userId);
    await post.save();
    postData = FilterPostData(post);
    res.status(200).json({ message: "add like", post: postData });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
