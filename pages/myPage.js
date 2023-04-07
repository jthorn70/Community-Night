import { getSession } from 'next-auth/react'

export async function getServerSideProps(context) {
    const session = await getSession(context)

    console.log(session)

    return {
        props: {
            session
        }
    }
}

function MyPage({ session }) {
    return (
        <div>
            <p>Session: {session ? JSON.stringify(session, null, 2) : 'None'}</p>
        </div>
    )
}

export default MyPage
