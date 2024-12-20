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
            const valUser = await userModel.findUser(payload.email);
            if (valUser){
                const response = {
                    status: 'Failed! User exists',
                }
                res.status(400).send(response);
            } else {
                const user = await userModel.createUser(payload);
                const accessToken = generateAccessToken(payload.email, user.id);
                const response = {
                    token: accessToken,
                    redirectUrl: '/'
                }
                res.status(200).send(response);
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: err,
            });
        }
    },
    async login(req, res) {
        try {
            const payload = req.body;
            const uEmail = payload.email;
            const uPass = payload.password
            const user = await userModel.findUser(uEmail);

            if (!user || !user.password || uPass != user.password) {
                const response = {
                    status: 500,
                    error: {
                        message: "Email/Password is incorrect!"
                    }
                }
                res.send(response);
            } else {
                const accessToken = generateAccessToken(user.email, user.userID);
                const response = {
                    user: user.firstName,
                    token: accessToken,
                    redirectUrl: '/',   
                }
                res.send(response);
            }
        } catch (err) {
            const response = {
                status: 500,
                error: err,
            }
            res.send(response);
        }
    }

}