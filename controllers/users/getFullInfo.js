const { Pet } = require('../../models/pet');

const getFullInfo = async (req, res) => {
  const { name, email, location, phone, birthday } = req.user;
  const { _id } = req.user;
  const pets = await Pet.find({ owner: _id });
  res.json({
    status: 'success',
    code: 200,
    data: { name, email, location, phone, birthday, pets },
  });
};

module.exports = getFullInfo;
