const jwt = require('jsonwebtoken');

const { User } = require('../models/user');

const { ACCESS_SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  try {
    if (bearer !== 'Bearer') {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
    const { id } = jwt.verify(token, ACCESS_SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.accessToken) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === 'Invalid signature') {
      return res
        .status(401)
        .json({ message: `Unauthorized user: ${error.message}` });
    }
    next(error);
  }
};

module.exports = { auth };
