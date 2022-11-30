const isUserAuth = async (req, res, next) => {
    if (req.session.isAuth) {
        next();
    }
    else {
        res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
};
module.exports = { isUserAuth };
