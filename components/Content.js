import { Box } from "./Box.js"
import Form from "../components/Form.js"


export const Content = ({ session, status }) => (
    <Box css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}>
        <Form session={session} status={status} />
    </Box>
);
