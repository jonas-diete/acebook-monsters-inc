const express = require("express");
const router = express.Router();

const HomeController = require("../controllers/home");

router.get("/", HomeController.Index);
router.get('/about', HomeController.About);

module.exports = router;
