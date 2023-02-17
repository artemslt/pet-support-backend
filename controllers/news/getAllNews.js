const New = require("../../models/news");
const { NotFound } = require("http-errors");

const getAllNews = async (req, res, next) => {
  const news = await New.find();
  if (news.length === 0) {
    throw NotFound("There is no news added")
  }
  res.json(news);
};

module.exports = getAllNews;