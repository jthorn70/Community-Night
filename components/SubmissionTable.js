import { Link, Grid, Table, Dropdown, Tooltip } from '@nextui-org/react';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import React from 'react';
import { DeleteIcon } from "./DeleteIcon";
import { IconButton } from "./IconButton";

export default function SubmissionTable({ session, status }) {
    const [eventName, setEventName] = useState('Community Night 1');
    const [selected, setSelected] = React.useState('Community Night 1');
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [user, setUser] = useState([]);


    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const moderators = ['jboondock', 'jbooogie', 'NTLX', 'olay', 'contra']
    const [isModerator, setIsModerator] = useState(false);
    const profileName = session?.user?.name;

    const handleDelete = async (id) => {
        let { data, error } = await supabase
            .from("Submissions")
            .delete()
            .eq("id", id)

        if (error) console.log("error", error);
        else {
            console.log(`Submission with id ${id} deleted successfully!`);
            // Update the `user` state to remove the deleted row
            setUser((prevUser) => prevUser.filter((item) => item.id !== id));
        }
    };

    // check to see if the user is a moderator
    useEffect(() => {
        const isModerator = moderators.includes(profileName);
        setIsModerator(isModerator);
    }, [profileName, moderators]);


    useEffect(() => {
        const fetchEvents = async () => {
            let { data, error } = await supabase
                .from('Submissions')
                .select('*')
                .order('id', { ascending: true });
            if (error) console.log('error', error);
            else {
                const shuffledEvents = fisherYatesShuffle(data);
                setEvents(shuffledEvents);
                console.log(data)
            }
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        setFilteredEvents(
            events.filter((event) => (eventName ? event.eventName === eventName : true))
        );
    }, [events, eventName]);

    const fisherYatesShuffle = (arr) => {
        let n = arr.length;
        for (let i = n - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

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
        isModerator
            ? {
                key: 'actions',
                label: 'Actions',
            }
            : {
                key: '',
                label: ''
            },
    ];


    const handleSelectionChange = (value) => {
        setSelected(value);
        setEventName(value);
    };
    return (
        <><Grid.Container gap={1} justify='center'>
            <Grid justify='center'>
                <Dropdown>
                    <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
                        {selected}
                    </Dropdown.Button>
                    <Dropdown.Menu
                        aria-label="Single selection actions"
                        color="secondary"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selected}
                        onSelectionChange={setSelected}
                        onAction={handleSelectionChange}
                    >
                        <Dropdown.Item key="Community Night 1">
                            Community Night 1
                        </Dropdown.Item>
                        <Dropdown.Item key="Community Night 2">
                            Community Night 2
                        </Dropdown.Item>
                        <Dropdown.Item key="Community Night 3">
                            Community Night 3
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Grid>
        </Grid.Container>
            <Grid.Container gap={1} justify='center'>
                <Grid justify='center'>
                    <Table
                        aria-label="Submission Form Table">
                        <Table.Header columns={columns}>
                            {(column) =>
                                column ? (
                                    <Table.Column key={column.key}>{column.label}</Table.Column>
                                ) : null
                            }
                        </Table.Header>

                        <Table.Body items={filteredEvents}>
                            {(item) => (
                                <Table.Row key={item.id}>
                                    {(columnKey) =>
                                        columnKey === 'link' ? (
                                            <Table.Cell>
                                                <Link href={item[columnKey]} target="_blank" rel="noopener noreferrer">
                                                    {item[columnKey]}
                                                </Link>
                                            </Table.Cell>
                                        ) : columnKey === 'actions' ? (
                                            isModerator ? (
                                                <Table.Cell>
                                                    <Tooltip content="Delete">
                                                        <IconButton onClick={() => handleDelete(item.id)}>
                                                            <DeleteIcon size={20} fill="#FF0080" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Table.Cell>
                                            ) : null
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

        </>
    );
}
