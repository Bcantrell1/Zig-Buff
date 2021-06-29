const signToken = require("../auth/serverAuth").signToken;

module.exports = {
    authenticate: (req, res) => {
        const token = signToken(req.user);
        res.redirect(`${process.env.FRONT_END_URL}?token=${token}`);
    },
};
