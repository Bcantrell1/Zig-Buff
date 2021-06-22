const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;

module.exports = app => {
    passport.use(new SteamStrategy({
        returnURL: 'http://localhost:5460/auth/steam/return',
        realm: 'http://localhost:5460/auth/steam',
        apiKey: process.env.STEAM_KEY
    },
        async (identifier, profile, done) => {

            profile.identifier = identifier;

            let user = {
                id: profile._json.steamid,
                name: profile._json.personaname,
                avatar: profile._json.avatar
            }

            return done(null, user)
        }
    ));
    app.use(passport.initialize());
};