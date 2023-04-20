import { Container, Grid, Card, Col, Row, Text } from "@nextui-org/react";
import dynamic from 'next/dynamic';
import CountdownClock from "./CountdownClock";
import { motion } from 'framer-motion'




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
            <Grid.Container justify="center">
                <Card css={{ w: 640 * 2, h: 360 * 2 }}>
                    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                        <Col>


                        </Col>
                    </Card.Header>
                    <Card.Body css={{ p: 0 }}>
                        <ReactPlayer
                            url="https://www.twitch.tv/jbooogie"
                            controls
                            width={640 * 2}
                            height={360 * 2}>

                        </ReactPlayer>
                    </Card.Body>
                    <Card.Footer
                        isBlurred
                        css={{
                            position: "absolute",
                            bgBlur: "#0f111466",
                            borderTop: "$borderWeights$light solid $gray800",
                            bottom: 0,
                            zIndex: 1,
                        }}
                    >
                        <Row>
                            <Col>
                                <Row>
                                    <Col span={3}>
                                        <motion.div
                                            whileHover={{ scale: 1.6, rotate: 17, transition: { duration: 0.7 } }}
                                            onHoverStart={e => { }}
                                            onHoverEnd={e => { }}>
                                            <Card.Image
                                                src="https://cdn.discordapp.com/attachments/741822865342595132/1096269728533712996/CN-LOGO-draw-2.png"
                                                height={80}
                                                width={80}
                                                alt="Breathing app icon"
                                            />
                                        </motion.div>

                                    </Col>
                                    <Col>
                                        <Text color="#d1d1d1" size={12}>
                                            Next Community Night
                                        </Text>
                                        <Text color="#d1d1d1" size={12}>
                                            Starts in...
                                        </Text>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row justify="flex-end">
                                    <CountdownClock targetDate={'2023-04-29T00:00:00Z'}></CountdownClock>
                                </Row>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>






                {/* <Card width='fit-content'>
                    <Grid.Container justify="center">
                        <Grid justify="center">
                            <CountdownClock targetDate={'2023-04-29T00:00:00Z'}></CountdownClock>
                        </Grid>
                        <Card.Body>
                            <Grid justify="center">
                                <ReactPlayer
                                    url="https://www.twitch.tv/jbooogie"
                                    controls
                                    width={640 * 2}
                                    height={360 * 2}>

                                </ReactPlayer>
                            </Grid>
                        </Card.Body>
                    </Grid.Container>
                </Card> */}
            </Grid.Container>

        </motion.div>
    );
}
