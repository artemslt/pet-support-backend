const { Pet } = require('../../models/pet');
const { Error } = require('http-errors');

const removePet = async (req, res) => {
  const { petId } = req.params;
  const result = await Pet.findByIdAndRemove(petId);
  if (!result) {
    const error = new Error('Not found');
    error.status = 404;
    throw error;
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'Pet card deleted!',
    data: { result },
  });
};

module.exports = removePet;
