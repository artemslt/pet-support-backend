const addNewNotice = require("./addNewNotice");
const addNoticeToFavorites = require("./addNoticeToFavourites");
const getFavoriteNotices = require("./getFavoriteNotices");
const getNoticeById = require("./getNoticeById");
const getNoticesByCategory = require("./getNoticesByCategory");
const getNoticesByUser = require("./getNoticesByUser");
const removeNoticeById = require("./removeNoticeById");
const removeNoticeFromFavorites = require("./removeNoticeFromFavorites");
const getNoticeByKeyword = require("./getNoticeByKeyword");

module.exports = {
  addNewNotice,
  addNoticeToFavorites,
  getFavoriteNotices,
  getNoticeById,
  getNoticesByCategory,
  getNoticesByUser,
  removeNoticeById,
  removeNoticeFromFavorites,
  getNoticeByKeyword
};