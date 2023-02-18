const express = require('express');

const { auth } = require('../../middleware/auth');
// const { upload } = require('../../middleware/upload');
const { ctrlWrapper } = require('../../middleware/ctrlWrapper');
const { users: ctrl } = require('../../controllers');
const router = express.Router();

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));
router.put('/edit', auth, ctrlWrapper(ctrl.editInfo));
router.get('/', auth, ctrlWrapper(ctrl.getFullInfo));
// router.patch(
//   '/avatars',
//   auth,
//   upload.single('avatar'),
//   ctrlWrapper(ctrl.updateAvatar)
// );
// router.get('/verify/:verificationToken', auth, ctrlWrapper(ctrl.verifyEmail));

module.exports = router;
