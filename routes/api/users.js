const express = require('express');

const { auth } = require('../../middleware/auth');
const upload = require('../../middleware/upload');
const { ctrlWrapper } = require('../../middleware/ctrlWrapper');
const { users: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));
router.patch('/edit', auth, ctrlWrapper(ctrl.editInfo));
router.get('/', auth, ctrlWrapper(ctrl.getFullInfo));

router.patch(
  '/avatar',
  auth,
  upload.single('avatar'),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
