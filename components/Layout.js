import { Content } from "./Content.js"
import { Box } from "./Box.js";
import SSRProvider from 'react-bootstrap/SSRProvider'
export const Layout = ({ children }) => (
    <SSRProvider>
        <Box
            css={{
                maxW: "100%"
            }}
        >
            {children}
        </Box>
    </SSRProvider>
);
