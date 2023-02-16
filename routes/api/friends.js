const express = require('express')

const router = express.Router();

const { getAllFriends } = require("../../controllers/controllers");
const {ctrlWrapper} = require("../../middleware/ctrlWrapper")

router.get('/', ctrlWrapper(getAllFriends))

module.exports = router