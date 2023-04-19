import { Grid, Button, Text } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { createClient } from '@supabase/supabase-js';
import SubmissionCard from './SubmissionCard';
import { motion } from 'framer-motion'


export default function VideoPlayer({ session, status }) {
    const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const profileName = session?.user?.name;
    const [videos, setVideos] = useState([]);
    const [submitterName, setSubmitterName] = useState([]);
    const [description, setDescription] = useState([]);
    const [category, setCategory] = useState([]);
    const [eventName, setEventName] = useState('');


    const getEventName = async () => {
        const { data, error } = await supabase
            .from('event')
            .select('*')
            .eq('id', 1)
        if (error) console.log('error', error);
        else {
            // get value of event name from data
            setEventName(data[0].name);
            console.log(data[0].name)
        }
    }

    useEffect(() => {
        getEventName();
    }, []);


    useEffect(() => {
        const fetchEvents = async () => {
            let { data, error } = await supabase
                .from('Submissions')
                .select('*')
                .eq('eventName', eventName)
                .order('category')
                .limit(45)
            if (error) console.log('error', error);
            else {
                setVideos(data.map((submission) => submission.link));
                setSubmitterName(data.map((submission) => submission.name));
                setDescription(data.map((submission) => submission.description));
                setCategory(data.map((submission) => submission.category));
                // console.log(data)
            }
        };
        fetchEvents();
    }, [eventName]);

    // useEffect(() => { console.log(submitterName) }, [submitterName])


    const playPreviousVideo = () => {
        setCurrentVideoIndex(
            currentVideoIndex === 0 ? videos.length - 1 : currentVideoIndex - 1
        );
    };

    const playNextVideo = () => {
        setCurrentVideoIndex(
            currentVideoIndex === videos.length - 1 ? 0 : currentVideoIndex + 1
        );
    };


    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
            transition={{ type: "spring", duration: 10, ease: "easeIn", delay: 2 }}
        >
            <Grid.Container justify='center' gap={0}>
                <Grid justify='center' xs={12}>
                    <Text>{currentVideoIndex + 1}/{videos.length}</Text>
                </Grid>
            </Grid.Container>
            <Grid.Container justify='center' gap={0}>
                <Grid justify='flex-end' xs={3}>
                    <Button onPress={playPreviousVideo}>Previous</Button>
                </Grid>
                <Grid justify='center' xs={6}>
                    <SubmissionCard
                        videoUrl={videos[currentVideoIndex]}
                        username={submitterName[currentVideoIndex]}
                        videoDesc={description[currentVideoIndex]}
                        videoCat={category[currentVideoIndex]} />
                </Grid>
                <Grid justify='flex-start' xs={3}>
                    <Button onPress={playNextVideo}>Next</Button>
                </Grid>
            </Grid.Container>
            <Grid.Container justify='center' gap={0}>

                <Grid justify='center' xs={12}>
                    <ReactPlayer
                        url={videos[currentVideoIndex]}
                        controls
                        width={640 * 2.4}
                        height={360 * 2.4}
                    />
                </Grid>

            </Grid.Container>
            {/* <Grid.Container justify='center' gap={4}>
                <Button.Group>

                </Button.Group>
            </Grid.Container > */}
        </motion.div>
    );
}
