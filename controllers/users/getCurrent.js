const getCurrent = async (req, res) => {
  try {
    const user = req.user;
    res.json({
      status: 'success',
      code: 200,
      data: {
        user,
      },
    });
  } catch (error) {
    res.send({ message: error.message });
  }
};

module.exports = getCurrent;
