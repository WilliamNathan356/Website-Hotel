const jwt = require("jsonwebtoken");

const userModel = require("../model/user");
const { jwtSecret, jwtExpiration } = require("../config")

const generateAccessToken = (email, id) => {
    return jwt.sign(
        {
            email,
            id
        },
        jwtSecret,
        {
            expiresIn: jwtExpiration,
        },
    );
};

module.exports = {
    async register(req, res) {
        try {
            const payload = req.body;
            const user = await userModel.createUser(
                Object.assign(payload)
            );
            const accessToken = generateAccessToken(payload.email, user.id);

            return res.status(200).json({
                status: true,
                data: {
                    user: user.toJSON(),
                    token: accessToken,
                },
            });
        } catch (err) {
            return res.status(500).json({
                status: false,
                error: err,
            });
        }
    },
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userModel.findUser({ email });

            if (!user || !user.password) {
                return res.status(400).json({
                    status: false,
                    error: {
                        message: "Email/Password is incorrect!"
                    }
                });
            }

            const accessToken = generateAccessToken(user.email, user.id);

            return res.status(200).json({
                status: true,
                data: {
                    user: user.toJSON(),
                    token: accessToken,
                }
            });
        } catch (err) {
            return res.status(500).json({
                status: false,
                error: err,
            });
        }
    }

}