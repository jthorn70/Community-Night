import { signOut, signIn } from 'next-auth/react';
import { Navbar, User } from '@nextui-org/react';

export default function DiscordLogin({ session, status }) {

    const handleSignIn = async (provider) => {
        await signIn(provider);
    };

    const handleLogout = async () => {
        await signOut();
    };

    const username = session?.user?.name || 'Guest';
    const avatar = session?.user?.image || 'https://i.pravatar.cc/150?u=a042581f4e29026704d';

    return (
        <>
            {status === 'loading' && (
                <Navbar.Link color="inherit" href="#">
                    Loading...
                </Navbar.Link>
            )}

            {status === 'authenticated' && (
                <Navbar.Link onClick={handleLogout} color="inherit" href="#">
                    <User
                        src={avatar}
                        name={username}
                    />
                    Logout
                </Navbar.Link>
            )}

            {status === 'unauthenticated' && (
                <Navbar.Link onClick={() => handleSignIn('discord')} color="inherit" href="#">

                    Login
                </Navbar.Link>
            )}
        </>
    );
}
