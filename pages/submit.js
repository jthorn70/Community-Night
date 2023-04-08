import { Navbar, Text } from "@nextui-org/react";
import { Layout } from "../components/Layout.js";
import { Content } from "../components/Content.js";
import { useSession } from 'next-auth/react'
import DiscordLogin from "../components/DiscordLogin.js";

export default function App() {

  const { data: session, status } = useSession();

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
          <Navbar.Link isActive href="/submit">Submit</Navbar.Link>
          <Navbar.Link href="/viewList">List</Navbar.Link>
          <Navbar.Link href="/profile/settings">My Profile</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <DiscordLogin session={session} status={status}></DiscordLogin>
        </Navbar.Content>
      </Navbar>
      <Content session={session} status={status} />
    </Layout>
  )
}