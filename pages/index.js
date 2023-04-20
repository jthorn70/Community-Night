import { Link, Navbar, Text } from "@nextui-org/react";
import { Layout } from "../components/Layout.js";
import Home from "../components/Home.js";
import DiscordLogin from "../components/DiscordLogin.js";
import { useSession } from "next-auth/react";

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
            <Navbar isBordered variant="sticky">
                <Navbar.Brand>
                    <Navbar.Toggle aria-label="toggle navigation" />

                    <Text b color="inherit" hideIn="xs">
                        CN
                    </Text>
                </Navbar.Brand>
                <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
                    <Navbar.Link isActive href="/">Home</Navbar.Link>
                    <Navbar.Link href="/submit">Submit</Navbar.Link>
                    <Navbar.Link href="/viewList">List</Navbar.Link>
                    <Navbar.Link href="/profile/settings">My Profile</Navbar.Link>
                </Navbar.Content>
                <Navbar.Content>
                    <DiscordLogin session={session} status={status}></DiscordLogin>
                </Navbar.Content>
                <Navbar.Collapse>
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
                <Home />
            </Layout>
        </>
    );
}
