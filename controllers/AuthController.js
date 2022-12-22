const User = require("../models/User");
const { validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const { validateUser } = require("../requests/authGuardRequest");
const jwtSecret = '4715aed3c946f7b0a38e6b534a9583628d84e96d10fbc04700770d572af3dce43625dd';
// refreshTokens in side auth server
let refreshTokens = []

exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const validatedData = {
            username: req.body.username,
            password: req.body.password,
        }
        const user = await User.findOne({ username: validatedData.username });
        if (!user) {
            return res.status(400).json({
                message: "Login not successful",
                error: "User not found",
            })
        }
        const passwordMatched = await bcrypt.compare(validatedData.password, user.password);
        if (!passwordMatched) {
            return res.status(400).json({ message: "Login not successful" });
        }
        // const maxAge = 3 * 60 * 60;
        // const token = jwt.sign(
        //     { id: user._id, username: validatedData.username },
        //     jwtSecret,
        //     {
        //         expiresIn: maxAge, // 3hrs in sec
        //     }
        // );
        // res.cookie("jwt", token, {
        //     httpOnly: true,
        //     maxAge: maxAge * 1000, // 3hrs in ms
        // });

        const accessToken = generateAccessToken({ user: req.body.name })
        const refreshToken = generateRefreshToken({ user: req.body.name })
        return res.json({ accessToken: accessToken, refreshToken: refreshToken })

        //     return res.status(200).json({
        //     message: "Login successful",
        //     user,
        // });

    } catch (error) {
        console.log(error);
    }
};

function refreshToken(req,res) {
    if (!refreshTokens.includes(req.body.token)) res.status(400).send("Refresh Token Invalid")
    refreshTokens = refreshTokens.filter((c) => c != req.body.token)
    //remove the old refreshToken from the refreshTokens list

    const accessToken = generateAccessToken({ user: req.body.name })
    const refreshToken = generateRefreshToken({ user: req.body.name })
    //generate new accessToken and refreshTokens
    
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
}

// accessTokens
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
}



function generateRefreshToken(user) {
    const refreshToken =
        jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "20m" })
    refreshTokens.push(refreshToken)
    return refreshToken
}

exports.authGuarded = async (req, res) => {
    try {
        return res.status(200).json({
            message: "Access granted"
        });

    } catch (error) {
        console.log(error);
    }
};