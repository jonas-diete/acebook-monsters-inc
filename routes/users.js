const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/new", UsersController.Create);
router.get("/account", UsersController.ProfileIndex);
router.post("/account/image", UsersController.Image);
router.get("/:id", UsersController.PublicIndex);
router.post("/request-friend", UsersController.AddFriend);

module.exports = router;
