const User = require("../model/user");
const bcrypt = require("bcryptjs");
const userLogin = async (req, res, next) => {
    const userdetails = req.body.user;
    console.log(userdetails);
    const usergot = await User.findOne({ email: userdetails.email, firebase_uuid: userdetails.firebase_uuid });
    if (usergot) {
        const validPassword = await bcrypt.compare(userdetails.password, usergot.password);
        if (validPassword) {
            req.session.isAuth = true;
            res.status(200).json({
                success: true,
                data: usergot
            })
        }
        else {
            res.status(401).json({
                status: false,
                message: "Invalid password."
            })
        }
    }
    else {
        res.status(404).json({
            success: false,
            message: "User does not exist."
        })
    }


}
const userSignIn = async (req, res, next) => {
    const userdetails = req.body.user;
    console.log(userdetails);
    const usergot = await User.findOne({ email: userdetails.email, firebase_uuid: userdetails.firebase_uuid });
    if (usergot) {
        res.status(400).json({
            success: false,
            message: "User already exists."
        })
    }
    else {
        // ! generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // ! now we set user password to hashed password
        userdetails.password = await bcrypt.hash(userdetails.password, salt);
        await User.create(userdetails)
            .then((user) => {
                res.status(200).json({
                    success: true,
                    data: user
                })
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({
                    success: false,
                    data: err
                })
            })
    }

}

const logoutUser = async (req, res, next) => {
    req.session.destroy();
    res.status(200).json({
        success: true,
        message: "User logged out."
    })
}

const getUserCollections = async (req, res, next) => {
    const userdetails = req.body.user;
    console.log(userdetails);
    const usergot = await User.findOne({ email: userdetails.email, firebase_uuid: userdetails.firebase_uuid });
    if (usergot) {
        res.status(200).json({
            success: true,
            data: usergot.collections
        })
    }
    else {
        res.status(404).json({
            success: false,
            message: "User does not exist."
        })
    }
}
module.exports = { userLogin, userSignIn, logoutUser, getUserCollections };