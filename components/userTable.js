import { Table, Link, Tooltip, Modal, Button, Text, Input, Dropdown, Checkbox, Textarea } from "@nextui-org/react";
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import React from "react";
import { DeleteIcon } from "./DeleteIcon";
import { EditIcon } from "./EditIcon";
import { IconButton } from "./IconButton";

export default function UserTable({ session, status }) {

    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };

    const [user, setUser] = useState([]);
    const [userName, setUserName] = useState('test');
    const [filteredEvents, setFilteredEvents] = useState([]);
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const [selected, setSelected] = React.useState(new Set(["Skating"]));
    const selectedValue = React.useMemo(
        () => Array.from(selected).join(", ").replaceAll("_", " "),
        [selected]
    );
    const [formValid, setFormValid] = useState(false);
    const [videoLink, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const profileName = session?.user?.name

    // console.log("user", profileName)
    // console.log("videolink", videoLink)
    // console.log("description", description)
    // console.log("category", category)



    useEffect(() => {
        const fetchEvents = async () => {
            let { data, error } = await supabase
                .from('Submissions')
                .select('*')
                .eq('name', profileName);
            if (error) console.log('error', error);
            else {
                setUser(data);
                // console.log(data)
            }
        };
        fetchEvents();
    }, [supabase, profileName]);

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
        if (error) console.log("Supabase error", error);
        else {
            console.log(`Submission with id ${id} updated successfully!`);
            // Update the `user` state to remove the deleted row
            setUser((prevUser) => prevUser.filter((item) => item.id !== id));
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
                                        <Tooltip content="Edit">
                                            <IconButton onClick={handler}>
                                                <EditIcon size={20} fill="#979797" />
                                            </IconButton>
                                            <Modal
                                                closeButton
                                                aria-labelledby="modal-title"
                                                open={visible}
                                                onClose={closeHandler}
                                            >
                                                <Modal.Header>
                                                    <Text id="modal-title" size={18}>
                                                        Edit Item
                                                    </Text>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Input
                                                        aria-label="Name"
                                                        initialValue={profileName}
                                                        readOnly
                                                        bordered
                                                        fullWidth
                                                        color="primary"
                                                        size="lg"
                                                        placeholder="Name"
                                                    />
                                                    <Input
                                                        aria-label="Link"
                                                        onChange={(event) => setLink(event.target.value)}
                                                        clearable
                                                        bordered
                                                        fullWidth
                                                        type="url"
                                                        color="primary"
                                                        size="lg"
                                                        placeholder="Link"
                                                    />
                                                    <Textarea
                                                        aria-label="Description"
                                                        onChange={(event) => setDescription(event.target.value)}
                                                        clearable
                                                        bordered
                                                        fullWidth
                                                        color="primary"
                                                        size="lg"
                                                        placeholder="Description"
                                                    />

                                                    <Dropdown name="category" required onChange={(event) => setCategory(event.target.value)}>

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

                                                        >
                                                            <Dropdown.Item key="skating">Skating</Dropdown.Item>
                                                            <Dropdown.Item key="meme">Meme</Dropdown.Item>
                                                            <Dropdown.Item key="other">Other</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button auto flat color="error" onPress={closeHandler}>
                                                        Cancel
                                                    </Button>
                                                    <Button auto onClick={() => handleUpdate(item.id)} onPress={() => handleUpdate(item.id)}>
                                                        Update
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </Tooltip>
                                        <Tooltip content="Delete">
                                            <IconButton onClick={() => handleDelete(item.id)}>
                                                <DeleteIcon size={20} fill="#FF0080" />
                                            </IconButton>
                                        </Tooltip>
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