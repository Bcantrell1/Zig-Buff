const signToken = require("../auth/serverAuth").signToken;

module.exports = {
    authenticate: (req, res) => {
        const token = signToken(req.user);
        res.redirect(`http://localhost:3000?token=${token}`);
    },
};
