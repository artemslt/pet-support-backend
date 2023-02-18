const express = require('express');
const { auth } = require('../../middleware/auth');
const { validation } = require('../../middleware/validation');
const { ctrlWrapper } = require('../../middleware/ctrlWrapper');
const { auth: ctrl } = require('../../controllers');
const { joiRegisterSchema, joiLoginSchema } = require('../../models/user');

const router = express.Router();

router.post(
  '/register',
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);
router.post('/login', validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.get('/logout', auth, ctrlWrapper(ctrl.logout));

module.exports = router;
