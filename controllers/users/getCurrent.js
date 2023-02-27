const getCurrent = async (req, res) => {
  try {
    const { name, email, birthday, phone, location, avatarURL, favorite } =
      req.user;
    res.json({
      status: 'success',
      code: 200,
      data: {
        user: { name, email, birthday, phone, location, avatarURL, favorite },
      },
    });
  } catch (error) {
    res.send({ message: error.message });
  }
};

module.exports = getCurrent;
