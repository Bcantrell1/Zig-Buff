const { verifyToken } = require("../auth/serverAuth");

const express = require("express"),
    player = require('../controllers/player'),
    router = express.Router();

router.get("/player/:id/:token", verifyToken, player.info)

module.exports = router;