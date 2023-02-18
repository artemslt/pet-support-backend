const getCurrent = async (req, res) => {
  const { name, email, verificationToken } = req.user;
  res.json({
    status: 'success',
    code: 200,
    data: {
      user: {
        name,
        email,
        verificationToken,
      },
    },
  });
};

module.exports = getCurrent;
