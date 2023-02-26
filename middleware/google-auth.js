const axios = require('axios');

const googleAuth = async (req, res, next) => {
  const { accessToken } = req.body;
  try {
    const validation = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`
    );
    if (validation.data.email !== req.body.email) {
      return res.status(403).json({ message: 'Invalid access token or email' });
    }
    next();
  } catch (error) {
    return res.status(401).json(error.message);
  }
};

module.exports = { googleAuth };
