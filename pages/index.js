import { Link, Navbar, Text } from "@nextui-org/react";
import { Layout } from "../components/Layout.js";
import Home from "../components/Home.js";
import DiscordLogin from "../components/DiscordLogin.js";
import { useSession } from "next-auth/react";
import CNIcon from "../components/CN.js";
import { motion } from "framer-motion";
import Stats from "../components/Stats.js";


export default function App() {

    const { data: session, status } = useSession();

    const collapseItems = [
        { name: "Home", href: "/" },
        { name: "Submit", href: "/submit" },
        { name: "List", href: "/viewList" },
        { name: "My Profile", href: "/profile/settings" },
    ];



    return (
        <>
            <Navbar shouldHideOnScroll isBordered variant="sticky">
                <Navbar.Brand>
                    <Navbar.Toggle showIn={"sm" || "xs" || "md"} aria-label="toggle navigation" />
                    <motion.div
                        initial={{
                            scale: 0,
                        }}
                        animate={{
                            scale: 1,
                            fill: "#a8a8a8",
                            yoyo: Infinity,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                        }}
                        whileHover={{
                            scale: 1.2,
                            rotate: 12,
                            fill: "#FFFFFF",
                            transition: {
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                            },


                        }}


                    >
                        <CNIcon gradient={true}></CNIcon>
                    </motion.div>
                    {/* <Text b color="inherit" hideIn="xs">
                        CN
                    </Text> */}
                </Navbar.Brand>
                <Navbar.Content enableCursorHighlight hideIn="sm" variant="underline">
                    <Navbar.Link isActive href="/">Home</Navbar.Link>
                    <Navbar.Link href="/submit">Submit</Navbar.Link>
                    <Navbar.Link href="/viewList">List</Navbar.Link>
                    <Navbar.Link href="/profile/settings">My Profile</Navbar.Link>
                </Navbar.Content>
                <Navbar.Content>
                    <DiscordLogin session={session} status={status}></DiscordLogin>
                </Navbar.Content>
                <Navbar.Collapse >
                    {collapseItems.map((item, index) => (
                        <Navbar.CollapseItem key={index}>
                            <Link
                                color="inherit"
                                css={{
                                    minWidth: "100%",
                                }}
                                href={item.href}
                            >
                                {item.name}
                            </Link>
                        </Navbar.CollapseItem>
                    ))}

                </Navbar.Collapse>
            </Navbar>
            <Layout>
                {/* <Home /> */}
                <Stats session={session} status={status}></Stats>
            </Layout>
        </>
    );
}
