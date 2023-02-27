const express = require('express');

const { auth } = require('../../middleware/auth');
const upload = require('../../middleware/upload');
const { ctrlWrapper } = require('../../middleware/ctrlWrapper');
const { users: ctrl } = require('../../controllers');
const { validation } = require('../../middleware/validation');
const { joiSchema } = require('../../models/pet');

const router = express.Router();

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));
router.patch('/edit', auth, ctrlWrapper(ctrl.editInfo));
router.get('/', auth, ctrlWrapper(ctrl.getFullInfo));
router.post(
  '/addpet',
  auth,
  upload.single('photo'),
  validation(joiSchema),
  ctrlWrapper(ctrl.addPet)
);
router.delete('/:petId', auth, ctrlWrapper(ctrl.removePet));
router.patch(
  '/avatar',
  auth,
  upload.single('avatar'),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
