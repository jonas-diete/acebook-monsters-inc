const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

// Middleware for checking user sign up form
const signUpChecker = (req, res, next) => {
  let passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  let nameRegex = /^[a-zA-Z ,.'-]+$/;
  let errorMessage = "";
  if (!req.body.password1.match(passwordRegex)) {
    errorMessage =
      "Password must be 8-15 characters and contain an uppercase, lowercase, numeric and special character";
    res.render("users/new", { error: errorMessage });
  } else if (!req.body.name.match(nameRegex)) {
    errorMessage = "Please enter a valid name";
    res.render("users/new", { error: errorMessage });
  } else if (req.body.password1 !== req.body.password2) {
    errorMessage = "Passwords do not match";
    res.render("users/new", { error: errorMessage });
  } else {
    next();
  }
};

router.get("/new", UsersController.New);
router.post("/new", signUpChecker, UsersController.Create);
router.get("/account", UsersController.ProfileIndex);
router.post("/account/image", UsersController.Image);
router.get("/:id", UsersController.PublicIndex);
router.post("/request-friend", UsersController.RequestFriend);
router.post("/accept-friend-request", UsersController.AddFriend);
router.post("/decline-friend-request", UsersController.DeclineFriend);

module.exports = router;
