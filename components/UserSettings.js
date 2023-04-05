import { Container, Card, Row, Col, Link, Table, Text, User, Grid } from "@nextui-org/react";
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import React from 'react';

export default function App() {
    const MockItem = ({ text }) => {
        return (
            <Card css={{ h: "$24", $$cardColor: '$colors$primary' }}>
                <Card.Body>
                    <Text h6 size={15} color="white" css={{ mt: 0 }}>
                        {text}
                    </Text>
                </Card.Body>
            </Card>
        );
    };
    const [user, setUser] = useState([]);
    const [userName, setUserName] = useState('test');
    const [filteredEvents, setFilteredEvents] = useState([]);
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    useEffect(() => {
        const fetchEvents = async () => {
            let { data, error } = await supabase
                .from('Submissions')
                .select('*')
                .eq('name', 'test');
            if (error) console.log('error', error);
            else {
                setUser(data);
                console.log(data)
            }
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        setFilteredEvents(
            user.filter((user) => (userName ? user.userName === userName : true))
        );
    }, [user, userName]);


    const columns = [
        {
            key: 'name',
            label: 'Name',
        },
        {
            key: 'link',
            label: 'Link',
        },
        {
            key: 'description',
            label: 'Description',
        },
        {
            key: 'category',
            label: 'Category',
        },

    ];





    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card >
                        <Card.Body>
                            <User
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                name="Ariana Wattson"
                                zoomed
                            />
                        </Card.Body>
                        <Grid.Container gap={2} justify="center">
                            <Grid xs={9}>
                                <MockItem text="1 of 2" />
                            </Grid>
                            <Grid xs={3}>
                                <MockItem text="2 of 2" />
                            </Grid>
                            <Grid>
                                <Text h2>Your Submissions</Text>
                            </Grid>
                            <Grid justify="center" xs={12}>

                                <Table
                                    color={'secondary'}
                                    selectionMode="multiple"
                                    aria-label="Submission Form Table">
                                    <Table.Header columns={columns}>
                                        {(column) => <Table.Column key={column.key}>{column.label}</Table.Column>}
                                    </Table.Header>
                                    <Table.Body items={user}>
                                        {(item) => (
                                            <Table.Row key={item.id}>
                                                {(columnKey) =>
                                                    columnKey === 'link' ? (
                                                        <Table.Cell>
                                                            <Link href={item[columnKey]} target="_blank" rel="noopener noreferrer">
                                                                {item[columnKey]}
                                                            </Link>
                                                        </Table.Cell>
                                                    ) : (
                                                        <Table.Cell>{item[columnKey]}</Table.Cell>
                                                    )
                                                }
                                            </Table.Row>
                                        )}
                                    </Table.Body>
                                </Table>
                            </Grid>
                        </Grid.Container>
                    </Card>
                </Card.Body>
            </Card>
        </Container>
    );
}
