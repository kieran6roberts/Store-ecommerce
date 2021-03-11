import { Button } from "@chakra-ui/react";
import * as React from "react";
import { ImCancelCircle } from "react-icons/im";

interface IRemoveButton {
    callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RemoveButton: React.FC<IRemoveButton> = ({ callback }) => {
    return (
        <Button 
        bg="pink.300"
        className="cart-item--remove"
        color="white"
        fontWeight="400"
        fontSize="xs"
        onClick={(event) => callback(event)}
        leftIcon={<ImCancelCircle />}
        size="sm"
        variant="solid"
        w="5rem"
        _hover={{
            bg: "pink.400"
        }}
        >
            Remove
        </Button>
    );
};

export default RemoveButton;