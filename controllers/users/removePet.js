const { Pet } = require('../../models/pet');
const removePet = async (req, res) => {
  const { petId } = req.params;
  const result = await Pet.findByIdAndRemove(petId);
  if (!result) {
    return res.status(404).json({ message: 'This pet not found' });
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'Pet card deleted!',
    data: { result },
  });
};

module.exports = removePet;
