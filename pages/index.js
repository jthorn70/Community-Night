import { Navbar, Link, Text, Button, Avatar, Dropdown } from "@nextui-org/react";
import { Layout } from "../components/Layout.js";
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
            window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=1090359375010467960&redirect_uri=https%3A%2F%2Fcommunity-night.vercel.app%2Fapi%2Fauth%2Fcallback%2Fdiscord&response_type=code&scope=identify';
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


            <Home />
        </Layout>
    );
}
