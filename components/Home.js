import { Grid } from "@nextui-org/react";
import dynamic from 'next/dynamic';
import CountdownClock from "./CountdownClock";
import { motion, HTMLMotionProps } from 'framer-motion'




export default function Home() {
    const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });


    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 100,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            exit={{
                opacity: 0,
                y: -100,
            }}
            transition={{ duration: 0.6, ease: "easeIn", delay: 0.4 }}
        >
            <Grid.Container justify="center" gap={2}>
                <CountdownClock targetDate={'2023-04-29T00:00:00Z'}></CountdownClock>
                <ReactPlayer
                    url="https://www.twitch.tv/jbooogie"
                    controls
                    width={640 * 2}
                    height={360 * 2}>

                </ReactPlayer>
            </Grid.Container>
        </motion.div>
    );
}
