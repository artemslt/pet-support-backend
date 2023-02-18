const getFullInfo = async (req, res) => {
  const user = req.user;
  res.json({
    status: 'success',
    code: 200,
    data: {
      user: user,
    },
  });
};

module.exports = getFullInfo;
