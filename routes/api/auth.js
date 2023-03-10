const express = require('express');
const { auth } = require('../../middleware/auth');
const { validation } = require('../../middleware/validation');
const { googleAuth } = require('../../middleware/google-auth');
const { ctrlWrapper } = require('../../middleware/ctrlWrapper');
const { auth: ctrl } = require('../../controllers');
const {
  joiRegisterSchema,
  joiGoogleLoginSchema,
  joiRPEmailSchema,
  joiRPPassSchema,
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
router.patch(
  '/resetpassword',
  validation(joiRPEmailSchema),
  ctrlWrapper(ctrl.resetPass)
);
router.patch(
  '/newpassword',
  validation(joiRPPassSchema),
  ctrlWrapper(ctrl.newPass)
);

module.exports = router;
