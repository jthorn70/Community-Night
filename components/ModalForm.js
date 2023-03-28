import React from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";


export default function ModalForm() {
    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };
    return (
        <div>
            <Button auto ghost color="success" onPress={handler}>
                Submit
            </Button>
            <Modal
                closeButton
                animated={true}
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        Submission
                        <Text b size={18}>
                            Accepted!
                        </Text>
                    </Text>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </div>
    );
}
