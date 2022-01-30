module.exports = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    profile_pic: user.profile_pic,

    active: user.active,
    createdAt: user.createdAt,
    connections: user.connections.map((connection) => ({
      id: connection._id,
      name: connection.name,
    })),
    company_profile: user.company_profile
  };
};
