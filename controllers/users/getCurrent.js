const getCurrent = async (req, res) => {
  try {
    const { name, email, birthday, phone, location, avatarURL } = req.user;
    res.json({
      status: 'success',
      code: 200,
      data: {
        user: { name, email, birthday, phone, location, avatarURL },
      },
    });
  } catch (error) {
    res.send({ message: error.message });
  }
};

module.exports = getCurrent;
