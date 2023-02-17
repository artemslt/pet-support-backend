const New = require("../../models/news");

const getAllNews = async (req, res, next) => {
    const news = await New.find();
    res.json(news);
}

module.exports = getAllNews;