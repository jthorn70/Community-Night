import { Container, Card, Text, User, Grid, Button, Link, Input } from "@nextui-org/react";
import React, { useEffect, useState, useContext } from 'react';
import UserTable from './userTable';
import { useSession } from 'next-auth/react';
import { GlobalContext } from "../pages/_app";
import { SendButton } from "./SendButton.js";
import { SendIcon } from "./SendIcon";

export default function App() {

    const { data: session, status } = useSession();
    const moderators = ['jboondock', 'jboogie', 'NTLX', 'olay', 'contra']
    const [isModerator, setIsModerator] = useState(false);

    const username = session?.user?.name || 'Guest';
    const avatar = session?.user?.image || 'https://i.pravatar.cc/150?u=a042581f4e29026704d';

    const { communityNight, setCommunityNight } = useContext(GlobalContext);

    useEffect(() => {
        const isModerator = moderators.includes(username);
        setIsModerator(isModerator);
    }, [username]);

    const handleCommunityNight = async (event) => {
        setCommunityNight(event.target.value);

    }

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
                <Text css={{
                    textGradient: "69deg, $blue600 -20%, $pink600 50%",
                }}
                    h2>Your Submissions</Text>
            </Grid>
            <UserTable session={session} status={status} />
            {isModerator && (
                <Link href={"/watch"}>
                    <Button >Start Community Night</Button>
                </Link>
            )}
            {/* {isModerator && (

                <Input
                    onChange={handleCommunityNight}
                    clearable
                    contentRightStyling={false}
                    placeholder={communityNight}
                    contentRight={
                        <SendButton  >
                            <SendIcon />
                        </SendButton>
                    }
                />
            )} */}
        </Container >
    );
}
