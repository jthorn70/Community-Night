import { Card, Button, Text, Dropdown, Textarea, Input, Grid, Modal } from '@nextui-org/react';
import React from "react";
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';
import styles from '../components/Form.module.css';



export default function Form({ session, status }) {
    // Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const profileName = session?.user?.name

    const [username, setName] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visible, setVisible] = React.useState(false);
    const [formValid, setFormValid] = useState(false);
    const handler = () => setVisible(true);


    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const category = Array.from(selected).join(", ").replaceAll("_", " ");
        formData.set("category", category);
        // console.log("Form data: ", Object.fromEntries(formData.entries()));
        const { username, videoLink, description, vidcategory } = Object.fromEntries(formData.entries());
        // console.log("Username: ", username);
        // console.log("Video Link: ", videoLink);
        // console.log("Description: ", description);
        // console.log("Category: ", category);

        const { data, error } = await supabase
            .from('Submissions')
            .insert([{ name: username, link: videoLink, description, category, eventName: "Community Night 1" }]);

        if (error) {
            console.log("Error: ", error);
            return;
        }

        if (!username || !videoLink || !description || !category) {
            console.log("Please fill out all fields");
            return;
        }

        setFormValid(true);
        console.log("Submission successful!")
        setSubmissionSuccess(true);
        setIsModalOpen(true);
        console.log("Modal open: ", isModalOpen);
        console.log("Submission success: ", submissionSuccess);

        setName('');
        setVideoLink('');
        setDescription('');
        setCategory('');
    };


    const [selected, setSelected] = React.useState(new Set(["Skating"]));
    const selectedValue = React.useMemo(
        () => Array.from(selected).join(", ").replaceAll("_", " "),
        [selected]
    );

    return (
        <Card isHoverable className={styles.card}>
            <Card.Body>
                <Grid.Container justify='center'>
                    <form onSubmit={handleSubmit}>
                        <Grid.Container gap={1} justify="center">
                            <Text h2>Submit a Video</Text>
                        </Grid.Container>

                        <Grid.Container gap={1} justify="center">
                            <Grid>
                                <Input
                                    clearable
                                    bordered
                                    readOnly
                                    label="Username"
                                    type="text"
                                    name="username"
                                    initialValue={profileName}
                                    required
                                    status={formValid ? "success" : "secondary"}
                                />
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
                                    status={formValid ? "success" : "secondary"}
                                />
                            </Grid>
                        </Grid.Container>

                        <Grid.Container gap={2} justify="center">
                            <Grid>
                                <Textarea status={formValid ? "success" : "secondary"} clearable bordered size='xl' labelPlaceholder="Description" name="description" required />
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
                                    >
                                        <Dropdown.Item key="skating">Skating</Dropdown.Item>
                                        <Dropdown.Item key="meme">Meme</Dropdown.Item>
                                        <Dropdown.Item key="other">Other</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Grid>
                        </Grid.Container>

                        <Grid.Container gap={2} justify="center">
                            <Button
                                auto ghost color="success" onSubmit={handleSubmit} onPress={handler} type="submit"
                            >
                                Submit
                            </Button>
                            <Modal
                                closeButton
                                animated={true}
                                aria-labelledby="modal-title"
                                open={visible}
                                onClose={closeHandler}
                            >
                                <Modal.Header>
                                    <Text id="modal-title" size={18}>
                                        Submission
                                        <Text b size={23}>
                                            {formValid ? " Accepted!" : " Failed"}
                                        </Text>
                                        <Text>{formValid ? "See you at Community Night!" : "Please Fill out the form correctly."}</Text>
                                    </Text>
                                </Modal.Header>
                                <Modal.Body>

                                </Modal.Body>
                                <Modal.Footer>

                                </Modal.Footer>
                            </Modal>

                            {/* <ModalForm></ModalForm> */}

                        </Grid.Container>

                    </form>
                </Grid.Container>
            </Card.Body>
        </Card>
    );
}
