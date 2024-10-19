const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, Login again",
            })
        }

        const decodedToken = jwt.decode(token);
        req.body.clerkId = decodedToken.clerkId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}