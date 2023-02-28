const express = require('express');

const { auth } = require('../../middleware/auth');
const upload = require('../../middleware/upload');
const { ctrlWrapper } = require('../../middleware/ctrlWrapper');
const { pets: ctrl } = require('../../controllers');
const { validation } = require('../../middleware/validation');
const { joiSchema } = require('../../models/pet');

const router = express.Router();

router.post(
  '/addpet',
  auth,
  upload.single('photo'),
  validation(joiSchema),
  ctrlWrapper(ctrl.addPet)
);
router.delete('/:petId', auth, ctrlWrapper(ctrl.removePet));

module.exports = router;
