import { Navbar, Text } from "@nextui-org/react";
import { Layout } from "../components/Layout.js";
import VideoPlayer from "../components/VideoPlayer.js";
import DiscordLogin from "../components/DiscordLogin.js";
import { useSession } from "next-auth/react";
import SubmissionTable from "../components/SubmissionTable.js";
import { useState, useEffect } from "react";

export default function App() {

    const { data: session, status } = useSession();

    const moderators = ['jboondock', 'jboogie', 'NTLX', 'olay', 'contra']
    const [isModerator, setIsModerator] = useState(false);
    const username = session?.user?.name || 'Guest';

    useEffect(() => {
        const isModerator = moderators.includes(username);
        setIsModerator(isModerator);
    }, [username]);

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
            {isModerator && <SubmissionTable session={session} status={status} randomized={true} />}
            {/* <SubmissionTable session={session} status={status} randomized={false}></SubmissionTable> */}
        </Layout>
    );
}
