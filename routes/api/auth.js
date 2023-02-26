const express = require('express');
const { auth } = require('../../middleware/auth');
const { validation } = require('../../middleware/validation');
const { googleAuth } = require('../../middleware/google-auth');
const { ctrlWrapper } = require('../../middleware/ctrlWrapper');
const { auth: ctrl } = require('../../controllers');
const {
  joiRegisterSchema,
  joiGoogleLoginSchema,
} = require('../../models/user');

const router = express.Router();

router.post(
  '/register',
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);
router.post('/login', ctrlWrapper(ctrl.login));
router.get('/logout', auth, ctrlWrapper(ctrl.logout));
router.post(
  '/googlelogin',
  googleAuth,
  validation(joiGoogleLoginSchema),
  ctrlWrapper(ctrl.googleLogin)
);
router.put('/forgot-password', ctrlWrapper(ctrl.forgot));

module.exports = router;
