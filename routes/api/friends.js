const express = require('express');

const router = express.Router();

const { getAllFriends } = require('../../controllers/friends/getAllFriends');
const { ctrlWrapper } = require('../../middleware/ctrlWrapper');

router.get('/', ctrlWrapper(getAllFriends));

module.exports = router;
