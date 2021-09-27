const express = require("express");
const userCtrl = require("../controller/userController");
const auth = require("../middleware/auth");

const router = new express.Router();

//signup
router.post("/users", userCtrl.createUser);

//login
router.post("/users/login", userCtrl.login);

//logout
router.post("/users/logout", auth, userCtrl.logout);

router.put("/users/connectionreq", auth, userCtrl.connectionreq);

router.put("/users/accept", auth, userCtrl.accept);

router.put("/users/decline", auth, userCtrl.decline);

module.exports = router;
