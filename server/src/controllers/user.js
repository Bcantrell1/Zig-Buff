const signToken = require('../auth/serverAuth').signToken;

module.exports = {
    authenticate: (req, res) => {
        const token = signToken(req.user);
        res.render("authenticated", {
            jwtToken: token,
            clientUrl: process.env.CLIENT_URL,
            user: req.user
        });
    },
}