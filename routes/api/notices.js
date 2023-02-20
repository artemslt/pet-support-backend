const express = require("express");

const router = express.Router();

const { notices: ctrl } = require('../../controllers');
const { ctrlWrapper } = require("../../middleware/ctrlWrapper");
const { auth } = require("../../middleware/auth");
const upload = require("../../middleware/upload");

router.get("/notices/:category", ctrlWrapper(ctrl.getNoticesByCategory));
router.get("/notice/:noticeId", ctrlWrapper(ctrl.getNoticeById));
router.get("/", auth, ctrlWrapper(ctrl.getNoticesByUser));
router.get("/favorite", auth, ctrlWrapper(ctrl.getFavoriteNotices));
router.post("/notice", auth, upload.single("image"), ctrlWrapper(ctrl.addNewNotice));
router.post("/favorite/:noticeId", auth, ctrlWrapper(ctrl.addNoticeToFavorites));
router.delete("/notice/:noticeId", auth, ctrlWrapper(ctrl.removeNoticeById));
router.delete("/favorite/:noticeId", auth, ctrlWrapper(ctrl.removeNoticeFromFavorites));
router.get("/:search", ctrlWrapper(ctrl.getNoticeByKeyword))


module.exports = router;