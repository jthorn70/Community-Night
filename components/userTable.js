import { Table, Link, Tooltip, Modal, Button, Text, Input, Dropdown, Grid, Textarea } from "@nextui-org/react";
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState, useRef, useMemo } from 'react';
import { DeleteIcon } from "./DeleteIcon";
import { EditIcon } from "./EditIcon";
import { IconButton } from "./IconButton";
import { motion } from 'framer-motion'

export default function UserTable({ session, status }) {

    function isValidUrl(value) {
        // Regex to match a valid URL
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

        return urlRegex.test(value);
    }

    const moderators = ['jboondock', 'jboogie', 'NTLX', 'olay', 'contra']
    const [isModerator, setIsModerator] = useState(false);
    const [user, setUser] = useState([]);
    const [userName, setUserName] = useState('test');
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [validURL, setValidURL] = useState(false);
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const [selected, setSelected] = useState(new Set(["Skating"]));
    const selectedValue = useMemo(
        () => Array.from(selected).join(", ").replaceAll("_", " "),
        [selected]
    );
    const [formValid, setFormValid] = useState(false);
    const [videoLink, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const profileName = session?.user?.name;
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);
    const [eventName, setEventName] = useState('');

    const [editID, setEditID] = useState();

    const newHandler = (id) => {
        setEditID(id);
        // console.log("edit id:", id);
    };

    const getCurrentEventName = async () => {
        const { data, error } = await supabase
            .from('event')
            .select('*')
            .eq('id', 1)
        if (error) console.log('error', error);
        else {
            // get value of event name from data
            setEventName(data[0].name);
        }
    }

    useEffect(() => {
        getCurrentEventName();
    }, []);

    const closeHandler = () => {
        setVisible(false);
        setEditID(null);
        console.log("closed");
    };

    const supabaseRef = useRef(supabase);

    useEffect(() => {
        let isMounted = true;
        const fetchEvents = async () => {
            let { data, error } = await supabaseRef.current
                .from('Submissions')
                .select('*')
                .eq('name', profileName);
            if (error) console.log('error', error);
            else {
                if (isMounted) setUser(data);
            }
        };
        fetchEvents();
        return () => {
            isMounted = false;
        };
    }, [supabase]);


    useEffect(() => {
        const isModerator = moderators.includes(profileName);
        setIsModerator(isModerator);
    }, [profileName]);

    useEffect(() => {
        setFilteredEvents(
            user.filter((user) => (userName ? user.userName === userName : true))
        );
    }, [user, userName]);

    const handleDelete = async (id) => {
        let { data, error } = await supabase
            .from("Submissions")
            .delete()
            .eq("id", id);
        if (error) console.log("error", error);
        else {
            console.log(`Submission with id ${id} deleted successfully!`);
            // Update the `user` state to remove the deleted row
            setUser((prevUser) => prevUser.filter((item) => item.id !== id));
        }
    };




    const handleUpdate = async (id) => {
        console.log(`Submission with id ${id} selected !`);

        const { data, error } = await supabase
            .from("Submissions")
            .update([{
                link: videoLink,
                description: description,
                category: category
            }])
            .eq("id", id);
        if (!profileName || !videoLink || !description || !category) {
            console.log("Please fill out all fields");
            return;
        }
        if (error) console.log("Supabase error", error);
        else {
            console.log(`Submission with id ${id} updated successfully!`);
            setFormValid(true);
            // Update the `user` state to remove the deleted row
            setUser((prevUser) => prevUser.filter((item) => item.id !== id));
            setVisible(false);
        }
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
        {
            key: 'eventName',
            label: 'Event',
        },
        {
            key: 'actions',
            label: 'Actions',
        }
    ];

    if (status === "authenticated") {
        return (
            <Table
                lined
                headerLined
                color={'secondary'}
                aria-label="User Form Table">
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

                                ) : columnKey === 'actions' ? (
                                    <Table.Cell>
                                        <Modal
                                            closeButton
                                            aria-labelledby="modal-title"
                                            open={visible}
                                            onClose={closeHandler}
                                        >
                                            <Modal.Header>
                                                {/* <Text id="modal-title" size={18}>
                                                        Edit Item
                                                    </Text> */}
                                                <Text h2>Edit Submission {editID}</Text>
                                            </Modal.Header>
                                            <Modal.Body>

                                                <form >
                                                    <Grid.Container gap={1} justify="center">

                                                    </Grid.Container>

                                                    <Grid.Container gap={1} justify="center">
                                                        <Grid>
                                                            <Tooltip content={"Not Editable"} color='secondary' placement='bottom'>
                                                                <Input
                                                                    bordered
                                                                    readOnly
                                                                    label="Username"
                                                                    type="text"
                                                                    name="username"
                                                                    initialValue={profileName}
                                                                    required
                                                                    status={formValid ? "success" : "secondary"}
                                                                />
                                                            </Tooltip>
                                                        </Grid>
                                                    </Grid.Container>

                                                    <Grid.Container gap={2} justify="center">
                                                        <Grid>
                                                            <Input
                                                                clearable
                                                                bordered
                                                                label="Video Link"
                                                                type="url"
                                                                name="videoLink"
                                                                placeholder='https://www.youtube.com/watch?v='
                                                                required
                                                                description={validURL ? "Valid URL" : "Invalid URL"}
                                                                status={formValid ? "success" : "secondary"}
                                                                onChange={(event) => {
                                                                    const url = event.target.value;
                                                                    try {
                                                                        new URL(url);
                                                                        setLink(url);
                                                                        setValidURL(true);
                                                                    } catch (error) {
                                                                        console.error('Invalid URL');
                                                                        setValidURL(false);
                                                                        // Handle invalid URL here, for example by showing an error message
                                                                    }
                                                                }}

                                                            />
                                                        </Grid>
                                                    </Grid.Container>

                                                    <Grid.Container gap={2} justify="center">
                                                        <Grid>
                                                            <Textarea
                                                                status={formValid ? "success" : "secondary"}
                                                                clearable bordered size='xl'
                                                                labelPlaceholder="Description"
                                                                name="description"
                                                                required
                                                                onChange={(event) => setDescription(event.target.value)} />
                                                        </Grid>
                                                    </Grid.Container>

                                                    <Grid.Container gap={2} justify="center">
                                                        <Grid >
                                                            <Dropdown name="category" required>

                                                                <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
                                                                    {selectedValue}
                                                                </Dropdown.Button>
                                                                <Dropdown.Menu
                                                                    aria-label="Single selection actions"
                                                                    color="secondary"
                                                                    disallowEmptySelection
                                                                    selectionMode="single"
                                                                    selectedKeys={selected}
                                                                    onSelectionChange={setSelected}
                                                                    onSelectCapture={setCategory(selectedValue)}
                                                                >
                                                                    <Dropdown.Item key="Skating">Skating</Dropdown.Item>
                                                                    <Dropdown.Item key="meme">Meme</Dropdown.Item>
                                                                    <Dropdown.Item key="other">Other</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </Grid>
                                                    </Grid.Container>

                                                    <Grid.Container gap={2} justify="center">


                                                    </Grid.Container>

                                                </form>


                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Grid.Container gap={2} justify="center">
                                                    <Grid>
                                                        <Button auto flat color="error" onPress={closeHandler}>
                                                            Cancel
                                                        </Button>
                                                    </Grid>
                                                    <Grid>
                                                        <Button auto onPress={() => handleUpdate(editID)} >
                                                            Update
                                                        </Button>
                                                    </Grid>
                                                </Grid.Container>
                                            </Modal.Footer>
                                        </Modal>
                                        {eventName === item.eventName ? (
                                            <Tooltip content="Edit">
                                                <motion.div whileHover={{ scale: 1.3, rotate: 30 }} whileTap={{ scale: 0.9 }}>
                                                    <IconButton onClick={handler}>
                                                        <EditIcon onClick={() => { newHandler(item.id) }} size={20} fill="#979797" />
                                                    </IconButton>
                                                </motion.div>
                                            </Tooltip>
                                        ) : (
                                            <Tooltip content="Not Editable">
                                                <motion.div whileHover={{ scale: 1.3, rotate: 22, color: 'red' }} whileTap={{ scale: 0.9 }}>
                                                    <IconButton >
                                                        <EditIcon size={20} fill="#979797" />
                                                    </IconButton>
                                                </motion.div>
                                            </Tooltip>
                                        )}

                                        {eventName === item.eventName ? (
                                            <Tooltip content="Delete">
                                                <motion.div whileHover={{ scale: 1.3, rotate: -30 }} whileTap={{ scale: 0.9 }} >
                                                    <IconButton onClick={() => handleDelete(item.id)}>
                                                        <DeleteIcon size={20} fill="#FF0080" />
                                                    </IconButton>
                                                </motion.div>
                                            </Tooltip>
                                        ) : (
                                            <Tooltip content="Not Deleteable">
                                                <motion.div whileHover={{ scale: 1.3, rotate: -30 }} whileTap={{ scale: 0.9 }}>
                                                    <IconButton >
                                                        <DeleteIcon size={20} fill="#FF0080" />
                                                    </IconButton>
                                                </motion.div>
                                            </Tooltip>
                                        )}
                                    </Table.Cell>
                                ) : (
                                    <Table.Cell>{item[columnKey]}</Table.Cell>
                                )


                            }


                        </Table.Row>

                    )}

                </Table.Body>
            </Table>
        )
    } else {
        const dummySubmission = {
            id: 0,
            name: "",
            email: "",
            link: "Please login to view your submissions",
            description: ""
        };

        return (
            <Table>
                <Table.Header columns={columns}>
                    {(column) => <Table.Column key={column.key}>{column.label}</Table.Column>}
                </Table.Header>
                <Table.Body>
                    <Table.Row key={dummySubmission.id}>
                        {(columnKey) =>
                            columnKey === "link" ? (
                                <Table.Cell>
                                    <p>{dummySubmission[columnKey]}</p>
                                </Table.Cell>
                            ) : (
                                <Table.Cell>{dummySubmission[columnKey]}</Table.Cell>
                            )
                        }
                    </Table.Row>
                </Table.Body>
            </Table>
        );
    }
}