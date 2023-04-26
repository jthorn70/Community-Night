import { useRef, useEffect } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
    mix
} from "framer-motion";
import { wrap } from "@motionone/utils";
import { Container, Grid, Text } from "@nextui-org/react";

function ParallaxText({ children, baseVelocity = 100 }) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const handleMouseMove = (event) => {
        const mouseX = event.clientX;
        const windowWidth = window.innerWidth;
        const percentX = mouseX / windowWidth;
        const xOffset = percentX * 2 - 1;
        baseX.set(-xOffset * 10);
    };

    // useEffect(() => {
    //     window.addEventListener("mousemove", handleMouseMove);
    //     return () => {
    //         window.removeEventListener("mousemove", handleMouseMove);
    //     };
    // }, []);

    const directionFactor = useRef(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="parallax">
            <motion.div
                className="scroller"
                style={{
                    x: useTransform(baseX, (v) => `${wrap(-100, 105, v)}%`),
                    fontFamily: "Plaster",
                    letterSpacing: -1,
                    fontSize: 65,
                    fontWeight: 600,
                    lineHeight: 1.5,
                    textAlign: "center",
                    marginBottom: 60,
                    // backgroundImage: "linear-gradient(90deg, rgba(62,18,61,1) 0%, rgba(59,18,135,1) 100%)",
                    // WebkitBackgroundClip: "text",
                    // WebkitTextFillColor: "transparent",
                }}
                whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.5, ease: "easeInOut" },
                    // backgroundImage: "linear-gradient(180deg, rgba(62,18,61,1) 0%, rgba(59,18,135,1) 100%) ",
                    // WebkitTextStroke: "1px rgba(1, 1, 1, 0.1)",
                    // WebkitBackgroundClip: "text",
                    // WebkitTextFillColor: "transparent",
                    rotate: Math.random() * 10 - 5,

                }}

            >
                <span>{children} </span>
            </motion.div>
        </div>
    );
}

export default function App() {
    return (
        <Container>
            <Grid justify="center" lg={12}>
                <ParallaxText baseVelocity={-25}>Welcome To</ParallaxText>
                <ParallaxText baseVelocity={25}>Community Night</ParallaxText>
            </Grid>
        </Container>
    );
}
