module.exports = (post) => {
  return {
    id: post.id,
    content: post.content,

    image: post.image,

    createdAt: post.createdAt,

    likes: post.likes.map((user) => ({
      id: user._id,
      name: user.name,
      image: user.image,
    })),
    user: {
      id: post.user._id,
      name: post.user.name,
      active: post.user.active,
      profile_pic: post.user.profile_pic,
    },
  };
};
