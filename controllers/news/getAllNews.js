const New = require("../../models/news");
// const { NotFound } = require("http-errors");

const getAllNews = async (req, res, next) => {
  const news = await New.find();
  if (news.length === 0) {
    // throw NotFound("There is no news added")
    return res.status(404).json({ message: 'There is no news added' });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      news
    }
  });
};

module.exports = getAllNews;