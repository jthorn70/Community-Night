import { Navbar, Text } from "@nextui-org/react";
import { Layout } from "../components/Layout.js";
import VideoPlayer from "../components/VideoPlayer.js";
import DiscordLogin from "../components/DiscordLogin.js";
import { useSession } from "next-auth/react";
import SubmissionTable from "../components/SubmissionTable.js";

export default function App() {

    const { data: session, status } = useSession();

    return (
        <Layout>
            <Navbar isCompact isBordered variant="sticky">
                <Navbar.Brand>
                    <Text b color="inherit" hideIn="xs">
                        Community Night
                    </Text>
                </Navbar.Brand>
                <Navbar.Content hideIn="xs" variant="underline">
                    <Navbar.Link href="/">Home</Navbar.Link>
                    <Navbar.Link href="/submit">Submit</Navbar.Link>
                    <Navbar.Link href="/viewList">List</Navbar.Link>
                    <Navbar.Link href="/profile/settings">My Profile</Navbar.Link>
                </Navbar.Content>
                <Navbar.Content>
                    <DiscordLogin session={session} status={status}></DiscordLogin>
                </Navbar.Content>
            </Navbar>
            <VideoPlayer session={session} status={status} />
            <SubmissionTable session={session} status={status} randomized={false}></SubmissionTable>
        </Layout>
    );
}
