import { Container, Grid, Row, Text } from "@nextui-org/react";
import { motion, MotionConfig } from 'framer-motion'
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState, useRef } from 'react';
import CNIcon from "./CN2";


export default function Stats({ session, status }) {
    const profileName = session?.user?.name;


    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const [uniqueUserCount, setUniqueUserCount] = useState(0);
    const [uniqueEventCount, setUniqueEventCount] = useState(0);
    const [randomName, setRandomName] = useState('The Community');
    const [names, setNames] = useState([]);
    const [events, setEvents] = useState([]);



    const timerRef = useRef(null);

    const getUniqueSubmissions = async () => {
        const { data, error } = await supabase
            .from('Submissions')
            .select('name')

        if (error) {
            console.log('error', error);
        } else {
            const uniqueNames = Array.from(new Set(data.map(item => item.name)));
            setNames(uniqueNames);
            // console.log('Unique submissions:', uniqueNames.length);
            // console.log('Unique submissions:', uniqueNames)

            setUniqueUserCount(uniqueNames.length);
        }
    }


    const getTotalEvents = async () => {
        const { data, error } = await supabase
            .from('Submissions')
            .select('eventName')

        if (error) {
            console.log('error', error);
        } else {
            const uniqueEvents = Array.from(new Set(data.map(item => item.eventName)));
            setEvents(uniqueEvents);
            console.log('Unique events:', uniqueEvents.length);
            console.log('Unique events:', uniqueEvents)
            setUniqueEventCount(uniqueEvents.length);
        }
    }



    const randomNameGen = () => {
        clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            const newName = names[Math.floor(Math.random() * names.length)];
            setRandomName(newName);
        }, 350);
    }

    const handleHoverEnd = () => {
        // Clear the timer when the hover ends
        clearInterval(timerRef.current);
        setRandomName('The Community');
    }




    useEffect(() => {
        getUniqueSubmissions();
        getTotalEvents();
    }, []);

    const [animatedUserCount, setAnimatedUserCount] = useState(0);
    const [animatedEventCount, setAnimatedEventCount] = useState(0);

    useEffect(() => {
        const increment = Math.ceil(uniqueUserCount / 100);
        if (animatedUserCount < uniqueUserCount) {
            const timeoutId = setTimeout(() => {
                setAnimatedUserCount(prevCount => prevCount + increment);
            }, 100);
            return () => clearTimeout(timeoutId);
        }
        if (animatedEventCount < uniqueEventCount) {
            const timeoutId = setTimeout(() => {
                setAnimatedEventCount(prevCount => prevCount + increment);
            }, 100);
            return () => clearTimeout(timeoutId);
        }
    }, [animatedUserCount, uniqueUserCount, animatedEventCount, uniqueEventCount]);






    return (
        <Container>
            <Grid.Container gap={2} justify="center">
                <Row>
                    <Grid xs={12} justify="center">

                        <motion.div layout onClick={() => setAnimatedUserCount(0)} initial={{ opacity: 0, x: -100, }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 1.3 }} >
                            <motion.div
                                initial={{
                                    borderRadius: '10px',
                                }}
                                whileHover={{
                                    boxShadow: '0px 0px 20px 0px rgba(131,58,180,1)',
                                    padding: '5px',
                                    borderRadius: '10px',
                                    scale: randomName === profileName
                                        ? 1.3
                                        : 1,
                                    rotate: randomName === profileName
                                        ? 7
                                        : Math.random() * 5,
                                    transition: {
                                        duration: 0.5,
                                    },
                                    pointer: "cursor",
                                }}>
                                <Text css={{ p: 10, }} h1>
                                    <motion.span
                                        initial={{
                                            backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}
                                        whileHover={{
                                            backgroundImage: 'linear-gradient(45deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)'
                                            , WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',

                                        }}
                                    >
                                        {animatedUserCount}
                                    </motion.span> Unique Users
                                </Text>
                            </motion.div>
                        </motion.div>
                    </Grid>
                </Row>
                <Row>
                    <Grid xs={12} lg={4} justify="start">

                        <motion.div layout whileHover={{}} onHoverStart={() => randomNameGen()} onHoverEnd={() => handleHoverEnd()} initial={{ opacity: 0, x: 100, y: 0 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2, duration: 1.3 }}>

                            <motion.div
                                initial={{
                                    borderRadius: '10px',
                                }}
                                whileHover={{
                                    boxShadow: '0px 0px 20px 0px rgba(131,58,180,1)',
                                    padding: '5px',
                                    borderRadius: '10px',
                                    scale: randomName === profileName
                                        ? 1.3
                                        : 1,
                                    rotate: randomName === profileName
                                        ? 7
                                        : Math.random() * 5,
                                    transition: {
                                        duration: 0.5,
                                    },
                                    pointer: "cursor",
                                }}
                            >
                                <Text h1>Submissions from: </Text>
                                <motion.h1
                                    initial={{
                                        backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%)'
                                        , WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                    whileHover={{
                                        backgroundImage: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',


                                        scale: randomName === profileName
                                            ? 1.3
                                            : 1,
                                        rotate: randomName === profileName
                                            ? 7
                                            : Math.random() * 5,
                                        WebkitTextStroke: randomName === profileName
                                            ? '1px #fff'
                                            : '0px #fff',

                                    }}  >{randomName}.</motion.h1>

                            </motion.div>

                        </motion.div>
                    </Grid>
                    <Grid xs={12} lg={4} justify="center">
                        <motion.div initial={{ opacity: 0, x: 100, scale: 3, y: 50 }} animate={{ opacity: 1, x: 0, }} transition={{ delay: 5, duration: 1.3 }}>
                            <motion.div whileHover={{ scale: 1.7, rotate: 7 }} transition={{ duration: .84 }}>
                                <Text hideIn='md'>
                                    <CNIcon ></CNIcon>
                                </Text>
                            </motion.div>
                        </motion.div>
                    </Grid>
                    <Grid xs={12} lg={4} justify="end">
                        <motion.div layout onClick={() => setAnimatedEventCount(0)} initial={{ opacity: 0, x: -100, y: 0 }} animate={{ opacity: 1, x: 0, }} transition={{ delay: 3, duration: 1.3 }}>
                            <motion.div
                                initial={{
                                    borderRadius: '10px',
                                }}
                                whileHover={{
                                    boxShadow: '0px 0px 20px 0px rgba(131,58,180,1)',
                                    padding: '5px',
                                    borderRadius: '10px',
                                    scale: randomName === profileName
                                        ? 1.3
                                        : 1,
                                    rotate: randomName === profileName
                                        ? 7
                                        : Math.random() * 5,
                                    transition: {
                                        duration: 0.5,
                                    },
                                    pointer: "cursor",
                                }}>
                                <Text css={{ p: 10 }} h1>
                                    <motion.span
                                        initial={{
                                            backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%)'
                                            , WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}
                                        whileHover={{
                                            backgroundImage: 'linear-gradient(45deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)'
                                            , WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            y: -10,
                                        }}
                                    >
                                        {animatedEventCount}
                                    </motion.span> Events and counting!</Text>
                            </motion.div>
                        </motion.div>
                    </Grid>
                </Row>
                <Row>
                    <Grid xs={12} justify="center">
                        <motion.div layout initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0, }} transition={{ delay: 4, duration: 1.3 }}>
                            <motion.div
                                initial={{
                                    borderRadius: '10px',
                                    padding: 10
                                }}
                                whileHover={{
                                    boxShadow: '0px 0px 20px 0px rgba(131,58,180,1)',
                                    padding: '5px',
                                    borderRadius: '10px',
                                    scale: randomName === profileName
                                        ? 1.3
                                        : 1,
                                    rotate: randomName === profileName
                                        ? 7
                                        : Math.random() * 5,
                                    transition: {
                                        duration: 0.5,
                                    },
                                    pointer: "cursor",
                                }}>

                                {/* <Text css={{ jc: 'right', mt: 75 }} h1>Hosted by</Text> */}
                                <h1>Hosted By <motion.span

                                    initial={{
                                        backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                    whileHover={{
                                        backgroundImage: 'linear-gradient(90deg, rgba(5,5,5,1) 0%, rgba(62,18,61,1) 0%, rgba(59,18,135,1) 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        WebkitTextStroke: '1px #ffffff',
                                        scale: 4,
                                        rotate: 7
                                    }}
                                ><a href="https://www.twitch.tv/jbooogie">JBooogie</a>
                                </motion.span>
                                </h1>
                            </motion.div>
                        </motion.div>
                    </Grid>
                </Row>

            </Grid.Container>
        </Container >
    );
} Text

