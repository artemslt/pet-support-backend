const googleAuth = async (req, res, next) => {
  const { accessToken } = req.body;

  const { email } = await res.redirect(
    `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`
  );
  if (email !== email.req.body) {
    return res.status(403).json({ message: 'Invalid access token or email' });
  }
  next();
};

module.exports = { googleAuth };

// const passport = require('passport');
// const { Strategy } = require('passport-google-oauth2');
// const { User } = require('../models/user');
// const bcryptjs = require('bcryptjs');

// const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

// const googleParams = {
//   clientID: GOOGLE_CLIENT_ID,
//   clientSecret: GOOGLE_CLIENT_SECRET,
//   callbackURL: 'http://localhost:3000/api/auth/google/callback',
//   passReqToCallback: true,
// };

// const googleCallback = async (
//   req,
//   accessToken,
//   refreshToken,
//   profile,
//   done
// ) => {
//   try {
//     const { email, displayName } = profile;
//     const user = await User.findOne({ email });
//     if (user) {
//       return done(null, user);
//     }
//     const password = bcryptjs.hash(Date.now().toString(), 10);
//     const newUser = await User.create({ email, password, name: displayName });
//     done(null, newUser);
//   } catch (error) {
//     done(error, false);
//   }
// };

// const googleStrategy = new Strategy(googleParams, googleCallback);

// passport.use('google', googleStrategy);

// module.exports = passport;
