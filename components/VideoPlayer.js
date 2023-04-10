import React from 'react';
import { Grid, Button } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { createClient } from '@supabase/supabase-js';


export default function VideoPlayer({ session, status }) {
    const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const profileName = session?.user?.name;
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            let { data, error } = await supabase
                .from('Submissions')
                .select('*')
                .eq('eventName', 'Community Night 1')
                .order('category')
            if (error) console.log('error', error);
            else {
                setVideos(data.map((submission) => submission.link));
            }
        };
        fetchEvents();
    }, []);


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
        <>
            <Grid.Container justify='center' gap={2}>

                <Grid justify='center' xs={12}>
                    <ReactPlayer
                        url={videos[currentVideoIndex]}
                        controls
                        width={640 * 2.4}
                        height={360 * 2.4}
                    />
                </Grid>

            </Grid.Container>
            <Grid.Container justify='center' gap={4}>
                <Button.Group>
                    <Button onPress={playPreviousVideo}>Previous</Button>
                    <Button onPress={playNextVideo}>Next</Button>
                </Button.Group>
            </Grid.Container >
        </>
    );
}
