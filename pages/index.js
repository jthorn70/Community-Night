import { Navbar, Link, Text, Button, Avatar, Dropdown } from "@nextui-org/react";
import { Layout } from "../components/Layout.js";
import { AcmeLogo } from "../components/AcmeLogo.js";
import Home from "../components/Home.js";
import { useRouter } from 'next/router';



export default function App() {
    const collapseItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Log Out",
    ];

    function LoginButton() {
        const router = useRouter();

        const handleLoginClick = () => {
            const scope = 'identify'; // Request only the "identify" scope for now

            // Redirect the user to Discord's OAuth authorization endpoint
            window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=1090359375010467960&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fdiscord&response_type=code&scope=identify';
        };

        return (
            <button onClick={handleLoginClick}>Log in with Discord</button>
        );
    }

    return (
        <Layout>

            <Navbar isCompact isBordered variant="sticky">
                <Navbar.Brand>
                    {/* <AcmeLogo /> */}
                    <Text b color="inherit" hideIn="xs">
                        Community Night
                    </Text>
                </Navbar.Brand>
                <Navbar.Content hideIn="xs" variant="underline">
                    <Navbar.Link isActive href="/">Home</Navbar.Link>
                    <Navbar.Link href="/submit">Submit</Navbar.Link>
                    <Navbar.Link href="/viewList">List</Navbar.Link>
                    <Navbar.Link href="/profile/settings">My Profile</Navbar.Link>
                </Navbar.Content>
                <Navbar.Content>
                    <Navbar.Link color="inherit" href="#">
                        Login
                    </Navbar.Link>
                    <LoginButton></LoginButton>
                </Navbar.Content>
            </Navbar>


            {/* <Navbar shouldHideOnScroll="true" isBordered variant="sticky">
                <Navbar.Toggle showIn="xs" />
                <Navbar.Brand
                    css={{
                        "@xs": {
                            w: "12%",
                        },
                    }}
                >
                    <AcmeLogo />
                    <Text b color="inherit" hideIn="xs">
                        COMM
                    </Text>
                </Navbar.Brand>
                <Navbar.Content
                    enableCursorHighlight
                    activeColor="secondary"
                    hideIn="xs"
                    variant="highlight-rounded"
                >
                    <Navbar.Link isActive href="/">Home</Navbar.Link>
                    <Navbar.Link href="/submit">
                        Submit
                    </Navbar.Link>
                    <Navbar.Link href="/viewList">View List</Navbar.Link>
                    <Navbar.Link href="#">About</Navbar.Link>
                </Navbar.Content>
                <Navbar.Content
                    css={{
                        "@xs": {
                            w: "12%",
                            jc: "flex-end",
                        },
                    }}
                >
                    <Dropdown placement="bottom-right">
                        <Navbar.Item>
                            <Dropdown.Trigger>
                                <Avatar
                                    bordered
                                    as="button"
                                    color="secondary"
                                    size="md"
                                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                />
                            </Dropdown.Trigger>
                        </Navbar.Item>
                        <Dropdown.Menu
                            aria-label="User menu actions"
                            color="secondary"
                            onAction={(actionKey) => console.log({ actionKey })}
                        >
                            <Dropdown.Item key="profile" css={{ height: "$18" }}>
                                <Text b color="inherit" css={{ d: "flex" }}>
                                    Signed in as
                                </Text>
                                <Text b color="inherit" css={{ d: "flex" }}>
                                    zoey@example.com
                                </Text>
                            </Dropdown.Item>
                            <Dropdown.Item key="settings" withDivider>
                                My Settings
                            </Dropdown.Item>
                            <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
                            <Dropdown.Item key="analytics" withDivider>
                                Analytics
                            </Dropdown.Item>
                            <Dropdown.Item key="system">System</Dropdown.Item>
                            <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
                            <Dropdown.Item key="help_and_feedback" withDivider>
                                Help & Feedback
                            </Dropdown.Item>
                            <Dropdown.Item key="logout" withDivider color="error">
                                Log Out
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Content>
                <Navbar.Collapse>
                    {collapseItems.map((item, index) => (
                        <Navbar.CollapseItem
                            key={item}
                            activeColor="secondary"
                            css={{
                                color: index === collapseItems.length - 1 ? "$error" : "",
                            }}
                            isActive={index === 2}
                        >
                            <Link
                                color="black"
                                css={{
                                    minWidth: "100%",
                                }}
                                href={item === "My Settings" ? "/profile/settings" : ""}

                            >
                                {item}test
                            </Link>
                        </Navbar.CollapseItem>
                    ))}
                </Navbar.Collapse>
            </Navbar> */}
            <Home />
        </Layout>
    );
}
