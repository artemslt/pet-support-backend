const express = require("express");

const router = express.Router();

const addNewNotice = require("../../controllers/notices/addNewNotice");
const getNoticesByCategory = require("../../controllers/notices/getNoticesByCategory");
const getNoticeById = require("../../controllers/notices/getNoticeById");
const ctrlWrapper = require("../../middleware/ctrlWrapper");
const upload = require("../../middleware/upload");
const removeNoticeById = require("../../controllers/notices/removeNoticeById")

router.get("/:category", ctrlWrapper(getNoticesByCategory));
router.get("/notice/:noticeId", ctrlWrapper(getNoticeById));
router.post("/", upload.single("image"), ctrlWrapper(addNewNotice));
router.delete("/notice/:noticeId", ctrlWrapper(removeNoticeById))

module.exports = router;