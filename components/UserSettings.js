import { Container, Card, Text, User, Grid, Button, Link } from "@nextui-org/react";
import React, { useEffect, useState } from 'react';
import UserTable from './userTable';
import { useSession } from 'next-auth/react';

export default function App() {

    const { data: session, status } = useSession();
    const moderators = ['jboondock', 'jbooogie', 'NTLX', 'olay', 'contra']
    const [isModerator, setIsModerator] = useState(false);

    const username = session?.user?.name || 'Guest';
    const avatar = session?.user?.image || 'https://i.pravatar.cc/150?u=a042581f4e29026704d';

    useEffect(() => {
        const isModerator = moderators.includes(username);
        setIsModerator(isModerator);
    }, [username, moderators]);


    return (
        <Container css={{ width: 'fit-content' }}>
            <Card >
                <User
                    src={avatar}
                    name={username}
                    zoomed
                />
            </Card>
            <Grid justify="center" xs={12}>
                <Text h2>Your Submissions</Text>
            </Grid>
            <UserTable session={session} status={status} />
            {isModerator && (
                <Link href={"/watch"}>
                    <Button >Start Community Night</Button>
                </Link>
            )}
        </Container>
    );
}
