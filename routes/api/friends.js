const express = require('express');

const router = express.Router();

const { friends: ctrl } = require('../../controllers');
const { ctrlWrapper } = require('../../middleware/ctrlWrapper');

router.get('/', ctrlWrapper(ctrl.getAllFriends));

module.exports = router;
