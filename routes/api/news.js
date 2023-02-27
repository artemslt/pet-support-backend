const express = require('express');

const router = express.Router();

const { news: ctrl } = require('../../controllers');
const { ctrlWrapper } = require('../../middleware/ctrlWrapper');

router.get('/', ctrlWrapper(ctrl.getAllNews));

module.exports = router;
