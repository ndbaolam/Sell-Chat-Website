const express = require("express");
const passport = require('passport');
const router = express.Router();

const controller = require("../../controller/client/user.controller");

const validate = require("../../validates/client/user.validate");

const authMiddleware = require("../../middlewares/client/auth.middleware");

router.get("/register", controller.register);

router.post(
    "/register",
    validate.registerPost,
    controller.registerPost
);

router.get("/login", controller.login);

router.post(
    "/login",
    validate.loginPost,
    controller.loginPost
);

router.get("/logout", controller.logout);

router.get("/password/forgot", controller.forgotPassword);

router.post(
    "/password/forgot",
    validate.forgotPasswordPost,
    controller.forgotPasswordPost
);

router.get("/password/otp", controller.otpPassword);

router.post("/password/otp", controller.otpPasswordPost);

router.get("/password/reset", controller.resetPassword);

router.post(
    "/password/reset",
    validate.resetPasswordPost,
    controller.resetPasswordPost
);

router.get(
    "/info",
    authMiddleware.requireAuth,
    controller.info
);

//Login Facebook
router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '*'
}));
//End Login Facebook

module.exports = router;