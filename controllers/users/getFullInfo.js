const { Pet } = require('../../models/pet');

const getFullInfo = async (req, res) => {
  const { name, email, location, phone, birthday, avatarURL } = req.user;
  const { _id } = req.user;
  const pets = await Pet.find({ owner: _id });
  res.json({
    status: 'success',
    code: 200,
    data: { name, email, location, phone, birthday, avatarURL, pets },
  });
};

module.exports = getFullInfo;
