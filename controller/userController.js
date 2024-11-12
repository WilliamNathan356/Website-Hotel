const userModel = require("../model/user");

module.exports = {
    getUser: (req, res) => {
        const {
            user: { userId },
        } = req;

        userModel.findUser({ id: userId })
        .then((user) => {
            return res.status(200).json({
                status: true,
                data: user.toJSON(),
            });
        })
        .catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    },
};