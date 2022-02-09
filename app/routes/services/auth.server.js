import {
    Authenticator,
    AuthorizationError
} from 'remix-auth';
import {
    SpotifyStrategy
} from 'remix-auth-spotify';
import {
    sessionStorage
} from './session.server';
import db from './db.server';

let User = db.models.User;

const scopes = ['user-read-private', 'user-read-recently-played', 'user-read-currently-playing'].join(' ');

export const spotifyStrategy = new SpotifyStrategy({
        clientID: "",           // Add your Spotify Client ID
        clientSecret: "",       // Add your Spotify Client Secret
        callbackURL: "http://localhost:3000/auth/spotify/callback",
        sessionStorage,
        scope: scopes,
    },
    async ({
        accessToken,
        refreshToken,
        extraParams,
        profile
    }) => {

        let findUser = await User.findOne({
            social_id: profile.id
        }).then((data) => data)     // findUser will be null or the user data depending on if it can find the user in the DB

        if (findUser !== null) {    // if user exists in DB, return the fetched user
            return findUser
        } else {                    // if user does not exist in DB, create new user and return new user
            let newUser = await User.create({
                username: profile.displayName,
                social_id: profile.id,
                avatar: profile.__json.images?.[0]?.url,
                spotify_url: profile.__json.external_urls.spotify,
                accessToken: accessToken,
                refreshToken: refreshToken
            }).catch(err => {
                console.log(err)
                return null;
            })
            return newUser;
        }
    }
);

export const authenticator = new Authenticator(sessionStorage, {
    sessionKey: spotifyStrategy.sessionKey,
    sessionErrorKey: spotifyStrategy.sessionErrorKey,
});

authenticator.use(spotifyStrategy);