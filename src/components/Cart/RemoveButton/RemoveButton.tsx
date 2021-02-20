import { Button } from "@chakra-ui/react";
import * as React from "react";
import { ImCancelCircle } from "react-icons/im";

interface IRemoveButton {
    callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RemoveButton: React.FC<IRemoveButton> = ({ callback }) => {
    return (
        <Button 
        color="pink.300"
        fontWeight="400"
        fontSize="xs"
        onClick={(event) => callback(event)}
        leftIcon={<ImCancelCircle />}
        size="sm"
        variant="solid"
        w="5rem"
        >
            Remove
        </Button>
    );
};

export default RemoveButton;