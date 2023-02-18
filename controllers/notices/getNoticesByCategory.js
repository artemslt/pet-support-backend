const Notice = require("../../models/notice");

const getNoticesByCategory = async (req, res) => {
  const { category } = req.params;
  const result = await Notice.find({ category });
  res.json({ result });
};

module.exports = getNoticesByCategory;

// пагінація з максимальною кількістю оголошень на сторінці