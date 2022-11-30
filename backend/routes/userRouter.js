const express = require("express");
const router = express.Router();
const { userLogin, userSignIn, logoutUser, getUserCollections } = require("../controller/userController");

router.route("/login")
    .post(userLogin);
router.route("/signin")
    .post(userSignIn);
router.route("/logout")
    .get(logoutUser)
router.route("/collections")
    .post(getUserCollections)

module.exports = router;