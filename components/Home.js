import { Grid, Image } from "@nextui-org/react";
import dynamic from 'next/dynamic';
import CountdownClock from "./CountdownClock";

export default function Home() {
    const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
    return (
        // <div style={{ width: "100%", height: "100vh" }}>
        //     <Image
        //         showSkeleton
        //         width="100%"
        //         height="100%"
        //         maxDelay={10000}
        //         src="https://img5.goodfon.com/original/2550x1800/8/1a/shtory-krasnye-zanaves.jpg"
        //         alt="Default Image"
        //     />
        // </div>

        <Grid.Container justify="center" gap={2}>
            <CountdownClock targetDate={'2023-04-15T12:00:00Z'}></CountdownClock>
            <ReactPlayer
                url="https://www.twitch.tv/jbooogie"
                controls
                width={640 * 2}
                height={360 * 2}>

            </ReactPlayer>

        </Grid.Container>
    );
}
