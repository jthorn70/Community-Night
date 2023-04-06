import { Container, Card, Row, Col, Link, Table, Text, User, Grid } from "@nextui-org/react";
import React from 'react';
import UserTable from './UserTable';
import { useSession } from 'next-auth/react';

export default function App() {
    const MockItem = ({ text }) => {
        return (
            <Card css={{ h: "$24", $$cardColor: '$colors$secondary' }}>
                <Card.Body>
                    <Text h6 size={15} color="white" css={{ mt: 0 }}>
                        {text}
                    </Text>
                </Card.Body>
            </Card>
        );
    };

    // function MyComponent() {
    //     const [session, loading] = useSession();

    //     if (loading) {
    //         return <div>Loading...</div>;
    //     }

    //     if (!session) {
    //         return <div>Please login</div>;
    //     }

    //     return <div>Welcome {session.user.name}</div>;
    // }
    console.log(useSession());







    return (
        <Container css={{ width: 'fit-content' }}>
            <Card >
                <User
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    name='test'
                    zoomed
                />

                <Grid.Container gap={2} >
                    <Grid xs={3}>
                        <Card css={{ h: "$24", $$cardColor: '$colors$secondary', height: 'fit-content' }}>
                            <Card.Body>
                                <Text h6 size={15} color="white" css={{ mt: 0 }}>
                                    All Time Submissions: 0
                                </Text>
                                <Text h6 size={15} color="white" css={{ mt: 0 }}>
                                    Community Nights Entered: 0
                                </Text>
                            </Card.Body>
                        </Card>
                    </Grid>
                    <Grid xs={3}>
                        <Card css={{ h: "$24", $$cardColor: '$colors$secondary', height: 'fit-content' }}>
                            <Card.Body>
                                <Text h6 size={15} color="white" css={{ mt: 0 }}>
                                    Graphs here? idk
                                </Text>

                            </Card.Body>
                        </Card>
                    </Grid>
                    <Grid>
                    </Grid>


                </Grid.Container>
            </Card>
            <Grid justify="center" xs={12}>
                <Text h2>Your Submissions</Text>

            </Grid>
            <UserTable />
        </Container>
    );
}
