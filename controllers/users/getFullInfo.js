const { Pet } = require('../../models/pet');

const getFullInfo = async (req, res) => {
  const user = req.user;
  const { _id } = req.user;
  const pets = await Pet.find({ owner: _id }).populate(
    'owner',
    '_id name email'
  );
  res.json({
    status: 'success',
    code: 200,
    data: { user, pets },
  });
};

module.exports = getFullInfo;
