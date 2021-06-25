const jwt = require('jsonwebtoken'),
    axios = require('axios'),
    { SECRET_KEY } = process.env;


const signToken = (user) => {
    return jwt.sign({ user }, SECRET_KEY, { expiresIn: '10m' });
}

const verifyToken = (req, res, next) => {
    const token = req.params.token || req.common.token || req.query.token;

    if (!token) {
        console.log('No Token Found')
        res.json({ success: false, message: "No token found" });
    }

    jwt.verify(token, SECRET_KEY, (error, decodedData) => {
        console.log('Verifying Token');
        if (error) {
            console.log(error);
            return res.json({ success: false, message: "Invalid token" });
        }
        console.log('Token Verified');
        next();
    })
}

module.exports = {
    signToken,
    verifyToken
}