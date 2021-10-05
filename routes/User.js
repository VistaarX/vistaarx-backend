const router = require("express").Router();
const {
  me,
  fetchUserById,
  fetchRecommandedUsers,
  fetchSendedConnectionRequest,
  fetchIncommingConnectionRequest,
  searchUsers,
} = require("../controllers/User/FetchUser");

const {
  sendMessageToConnection,
  getConnectionMessages,
} = require("../controllers/User/Chat");
const {
  sendConnectionRequest,
  acceptConnectionRequest,
  declineConnectionRequest,
  cancelSendedConnectionRequest,
  updateProfilePic,
  updateCoverPic,
  updateProfile,
  clearNotification,
} = require("../controllers/User/UserAction");
const authRequired = require("../middleware/AuthRequired");

router.get("/me", authRequired, me);
router.get("/recommanded_users", authRequired, fetchRecommandedUsers);
router.get(
  "/connection_request/sended",
  authRequired,
  fetchSendedConnectionRequest
);
router.get(
  "/connection_request/received",
  authRequired,
  fetchIncommingConnectionRequest
);

router.get("/search", searchUsers);
router.get(
  "/connection_request/:userId/send",
  authRequired,
  sendConnectionRequest
);
router.get(
  "/connection_request/:requestId/accept",
  authRequired,
  acceptConnectionRequest
);
router.get(
  "/connection_request/:requestId/decline",
  authRequired,
  declineConnectionRequest
);
router.get(
  "/connection_request/:requestId/cancel",
  authRequired,
  cancelSendedConnectionRequest
);
router.get("/:user_id", authRequired, fetchUserById);

// router.post("/chat/:connectionId/send", authRequired, sendMessageToConnection);
// router.get(
//   "/chat/:connectionId/get_messages",
//   authRequired,
//   getConnectionMessages
// );

// router.put("/profile_pic/update", authRequired, updateProfilePic);

// router.put("/update_profile/:input", authRequired, updateProfile);
// router.delete("/notifications/clear", authRequired, clearNotification);

module.exports = router;
