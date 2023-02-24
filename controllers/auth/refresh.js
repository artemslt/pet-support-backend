const jwt = require('jsonwebtoken');

const { User } = require('../../models/user');

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const refresh = async (req, res) => {
  const { refreshToken: token } = req.body;
  try {
    const { id } = jwt.verify(token, REFRESH_SECRET_KEY);
    const isExist = await User.findOne({ refreshToken: token });
    if (!isExist) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    const payload = {
      id,
    };
    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: '5m',
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: '7d',
    });
    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(403).json({ message: `${error.message}` });
  }
};

module.exports = refresh;
