import { Container, Card, Text, User, Grid } from "@nextui-org/react";
import React from 'react';
import UserTable from './userTable';
import { useSession } from 'next-auth/react';

export default function App() {

    const { data: session, status } = useSession();

    const username = session?.user?.name || 'Guest';
    const avatar = session?.user?.image || 'https://i.pravatar.cc/150?u=a042581f4e29026704d';

    return (
        <Container css={{ width: 'fit-content' }}>
            <Card >
                <User
                    src={avatar}
                    name={username}
                    zoomed
                />

                {/* <Grid.Container gap={2} >
                    <Grid xs={3}>
                        <Card css={{ h: "$24", $$cardColor: '$colors$secondary', height: 'fit-content' }}>
                            <Card.Body>
                                <Text h6 size={15} color="white" css={{ mt: 0 }}>
                                    Lorum ipsum
                                </Text>
                                <Text h6 size={15} color="white" css={{ mt: 0 }}>
                                    Lorum ipsum
                                </Text>
                            </Card.Body>
                        </Card>
                    </Grid>
                    <Grid xs={3}>
                        <Card css={{ h: "$24", $$cardColor: '$colors$secondary', height: 'fit-content' }}>
                            <Card.Body>
                                <Text h6 size={15} color="white" css={{ mt: 0 }}>
                                    Lorum ipsum
                                </Text>

                            </Card.Body>
                        </Card>
                    </Grid>
                    <Grid>
                    </Grid>


                </Grid.Container> */}
            </Card>
            <Grid justify="center" xs={12}>
                <Text h2>Your Submissions</Text>

            </Grid>
            <UserTable session={session} status={status} />
        </Container>
    );
}
