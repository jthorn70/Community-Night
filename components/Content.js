import { Input, Grid } from "@nextui-org/react"
import { Box } from "./Box.js"
import Form from "../components/Form.js"

export const Content = () => (
    <Box css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}>
        <Form />
    </Box>
);
