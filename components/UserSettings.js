import { Container, Card, Text, User, Grid, Button, Link, Input, Tooltip } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import UserTable from './userTable';
import { useSession } from 'next-auth/react';
import { SendButton } from "./SendButton.js";
import { SendIcon } from "./SendIcon";
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion'


export default function App() {

    const { data: session, status } = useSession();
    const moderators = ['jboondock', 'jboogie', 'NTLX', 'olay', 'contra']
    const [isModerator, setIsModerator] = useState(false);
    const [eventName, setEventName] = useState('');
    const [eventNameChange, setEventNameChange] = useState('');

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);



    const username = session?.user?.name || 'Guest';
    const avatar = session?.user?.image || 'https://i.pravatar.cc/150?u=a042581f4e29026704d';



    const getEventName = async () => {
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

    const handleInputChange = (e) => {
        setEventNameChange(e.target.value);
    };

    useEffect(() => {
        getEventName();
    }, [eventName]);

    useEffect(() => {
        const isModerator = moderators.includes(username);
        setIsModerator(isModerator);
    }, [username]);

    const handleCommunityNight = async (event) => {
        let { data, error } = await supabase
            .from("event")
            .update({ name: eventNameChange })
            .eq("id", 1)

        if (error) console.log("error", error);
        else {
            console.log(`Event name updated successfully!`);
            setEventName(eventNameChange);
            console.log(eventNameChange)
        }

    }

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
            <Container >
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
                        <Button color={'secondary'} >Start Community Night</Button>
                    </Link>
                )}
                {isModerator && (

                    <Input
                        clearable
                        contentRightStyling={false}
                        placeholder={'Change Event Name'}
                        onChange={handleInputChange}

                        contentRight={
                            <Tooltip trigger="hover" content={"Change the event name"} color={'secondary'} placement={'bottom'}>

                                <SendButton onClick={handleCommunityNight} >
                                    <SendIcon />
                                </SendButton>
                            </Tooltip>
                        }
                    />

                )
                }
            </Container >
        </motion.div>
    );
}
