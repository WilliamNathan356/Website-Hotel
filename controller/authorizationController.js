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
    register: (req,res) => {
        const payload = req.body;
        
        userModel.createUser(
            Object.assign(payload)
        )
        .then((user) => {
            const accessToken = generateAccessToken(payload.email, user.id);

            return res.status(200).json({
                status: true,
                data: {
                    user: user.toJSON(),
                    token: accessToken,
                },
            });
        })
        .catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    },
    login: (req, res) => {
        const { email, password } = req.body;

        userModel.findUser({ email })
        .then((user) => {
            if (!user){
                return res.status(400).json({
                    status: false,
                    error: {
                        message: "Email/Password is incorrect!"
                    }
                })
            }

            if (!user.password){
                return res.status(400).json({
                    status: false,
                    error: {
                        message: "Email/Password is incorrect!"
                    }
                })
            }

            const accessToken = generateAccessToken(user.email, user.id)

            return res.status(200).json({
                status: true,
                data: {
                    user: user.toJSON(),
                    token: accessToken,
                }
            })
        })
        .catch((err) =>{
            return res.status(500).json({
                status: false,
                error: err,
            })
        });
    }
}