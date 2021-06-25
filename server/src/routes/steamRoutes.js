const passport = require("passport"),
    express = require("express"),
    router = express.Router(),
    userCtrl = require('../controllers/user');
router.get("/steam",
    passport.authenticate("steam", { session: false })
);

router.get("/steam/return",
    passport.authenticate("steam", { session: false }), userCtrl.authenticate
);

module.exports = router;