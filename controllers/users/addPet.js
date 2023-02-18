const { Pet } = require('../../models/pet');

const addPet = async (req, res) => {
  const { _id } = req.user;
  const result = await Pet.create({ ...req.body, owner: _id });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: { result },
  });
};

module.exports = addPet;
