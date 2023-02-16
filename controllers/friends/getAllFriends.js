const Friend = require("../../models/friend")

const getAllFriends = async (req, res, next) => {
    const friends = await Friend.find()
        res.json(friends)
}

module.exports = getAllFriends