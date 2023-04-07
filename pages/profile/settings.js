import { Navbar, Link, Text, Avatar, Dropdown } from "@nextui-org/react";
import { Layout } from "../../components/Layout.js";
import UserSettings from "../../components/UserSettings.js";

export default function App() {
    const collapseItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];



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
                    <Navbar.Link href="/">Home</Navbar.Link>
                    <Navbar.Link href="/submit">Submit</Navbar.Link>
                    <Navbar.Link href="/viewList">List</Navbar.Link>
                    <Navbar.Link isActive href="/profile/settings">My Profile</Navbar.Link>
                </Navbar.Content>
                <Navbar.Content>
                    <Navbar.Link color="inherit" href="#">
                        Login
                    </Navbar.Link>

                </Navbar.Content>
            </Navbar>
            <UserSettings></UserSettings>
        </Layout>
    );
}
