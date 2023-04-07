import { getSession } from 'next-auth/client';
import { getDiscordAuthUrl } from '../lib/discord';

export default async function login(req, res) {
    const session = await getSession({ req });

    if (session && session.user) {
        // User is already signed in, redirect to home page
        res.redirect('/');
        return;
    }

    // User is not signed in, redirect to Discord authorization page
    const authUrl = getDiscordAuthUrl();
    res.redirect(authUrl);
}
