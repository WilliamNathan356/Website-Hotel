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
                redirectTo: '/'
            }
            res.status(200).send(response);
        }
        
    },
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userModel.findUser({ email });

            if (!user || !user.password) {
                res.status(400).json({
                    status: false,
                    error: {
                        message: "Email/Password is incorrect!"
                    }
                });
            }

            const accessToken = generateAccessToken(user.email, user.id);

            res.status(200).json({
                status: true,
                data: {
                    user: user.toJSON(),
                    token: accessToken,
                    redirectUrl: '../index.html',
                }
            });
        } catch (err) {
            res.status(500).json({
                status: false,
                error: err,
            });
        }
    }

}