const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/new", UsersController.Create);
// router.get("/:id", UsersController.View);
// router.get("/:id/edit", UsersController.Edit);

module.exports = router;
