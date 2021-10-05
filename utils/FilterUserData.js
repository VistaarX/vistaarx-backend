module.exports = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,

    active: user.active,
    createdAt: user.createdAt,
    connections: user.connections.map((connection) => ({
      id: connection._id,
      name: connection.name,
    })),
  };
};
