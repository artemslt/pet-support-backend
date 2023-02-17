const express = require("express");

const router = express.Router();

const { getAllNews } = require("../../controllers/controllers");
const { ctrlWrapper } = require("../../middleware/ctrlWrapper");

router.get("/", ctrlWrapper(getAllNews));

module.exports = router;