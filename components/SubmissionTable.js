import { Link, Grid, Table, Dropdown, Tooltip } from '@nextui-org/react';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import React from 'react';
import { DeleteIcon } from "./DeleteIcon";
import { IconButton } from "./IconButton";
import { motion } from 'framer-motion'


export default function SubmissionTable({ session, status, randomized }) {
    const [eventName, setEventName] = useState('');
    const [currentEventName, setCurrentEventName] = useState('');
    const [selected, setSelected] = useState(currentEventName);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [user, setUser] = useState([]);
    const [dataChanged, setDataChanged] = useState(false);





    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const moderators = ['jboondock', 'jboogie', 'NTLX', 'olay', 'contra']
    const [isModerator, setIsModerator] = useState(false);
    const profileName = session?.user?.name;



    const getCurrentEventName = async () => {
        const { data, error } = await supabase
            .from('event')
            .select('*')
            .eq('id', 1)
        if (error) console.log('error', error);
        else {
            // get value of event name from data
            setCurrentEventName(data[0].name);
        }
    }

    useEffect(() => {
        getCurrentEventName();
    }, []);

    useEffect(() => {
        setSelected(currentEventName);
        setEventName(currentEventName);
    }, [currentEventName]);


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
            setDataChanged(!dataChanged);
        }
    };

    // check to see if the user is a moderator
    useEffect(() => {
        const isModerator = moderators.includes(profileName);
        setIsModerator(isModerator);
    }, [profileName]);


    useEffect(() => {
        const fetchEvents = async () => {
            let { data, error } = await supabase
                .from('Submissions')
                .select('*')
                .order('category');

            if (error) console.log('error', error);
            else {
                if (randomized) {
                    setEvents(fisherYatesShuffle(data));
                } else {
                    setEvents(data);
                }
            }
        };
        fetchEvents();
    }, [dataChanged]);

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
        <motion.div
            initial={{
                opacity: 0,
                x: 100,
            }}
            animate={{
                opacity: 1,
                x: 0,
            }}
            exit={{
                opacity: 0,
                x: -100,
            }}
            transition={{ type: "spring", duration: 0.6, ease: "easeIn", delay: 0.4 }}
        >
            <Grid.Container gap={1} justify='center'>
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
                                                        <motion.div whileHover={{ scale: 1.3, rotate: -30 }} whileTap={{ scale: 0.9 }} >
                                                            <IconButton onClick={() => handleDelete(item.id)}>
                                                                <DeleteIcon size={20} fill="#FF0080" />
                                                            </IconButton>
                                                        </motion.div>
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

        </motion.div>
    );
}
