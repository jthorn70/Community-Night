import axios from 'axios';
import qs from 'qs';

const redirect_uri = `${process.env.BASE_URL}/api/discord`;
export default async function discordCallback(req, res) {
    const { code } = req.query;

    // Exchange the authorization code for an access token
    const { data: tokenResponse } = await axios.post(
        'https://discord.com/api/oauth2/token',
        qs.stringify({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri,
            scope: 'identify email',
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        },
    );

    // Get user information using the access token
    const { data: userResponse } = await axios.get('https://discord.com/api/users/@me', {
        headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
        },
    });

    // Create session object if it doesn't exist
    if (!req.session) {
        req.session = {};
    }

    // Set the user session data
    req.session.user = {
        id: userResponse.id,
        name: userResponse.username,
        email: userResponse.email,
        image: `https://cdn.discordapp.com/avatars/${userResponse.id}/${userResponse.avatar}.png`,
    };

    // Redirect user to home page
    res.redirect('/profile/settings');
}
``
