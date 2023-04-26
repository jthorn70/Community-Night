import { Container, Grid, Card, Col, Row, Text } from "@nextui-org/react";
import dynamic from 'next/dynamic';
import CountdownClock from "./CountdownClock";
import { motion } from 'framer-motion'
import ScrollingText from "./ScrollingText";




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
            <Grid.Container justify="center" >
                <Card css={{ width: "fit-content", position: "absolute", left: "50%", transform: "translateX(-50%)", "@media screen and (max-width: 767px)": { position: "static", transform: "none" } }}>
                    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                        <Col>


                        </Col>
                    </Card.Header>
                    <Card.Body css={{ p: 0 }}>
                        <ScrollingText />
                        <br />
                        <br />
                        <br />
                        <br />

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
                            <Col xs={6}>
                                <Row>
                                    <Col span={3}>

                                        <Card.Image
                                            src="https://cdn.discordapp.com/attachments/741822865342595132/1096269728533712996/CN-LOGO-draw-2.png"
                                            height={120}
                                            width={120}
                                            alt="Breathing app icon"
                                        />

                                    </Col>
                                    <Col>
                                        <Text color="#d1d1d1" size={24}>
                                            Next Community Night
                                        </Text>
                                        <Text color="#d1d1d1" size={24}>
                                            Starts in...
                                        </Text>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={6}>
                                <CountdownClock
                                    targetDate={'2023-04-29T00:00:00Z'}
                                    fontSize={45}
                                />
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>
            </Grid.Container>
        </motion.div>
    );
}
