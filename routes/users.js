const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/new", UsersController.Create);
router.get("/account", UsersController.View);
router.post("/account/image", UsersController.Image);


module.exports = router;
