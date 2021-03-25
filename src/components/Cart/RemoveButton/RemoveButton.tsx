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
        py={{base: 2, xl: 6}}
        px={{base: 2, xl: 6}}
        size="sm"
        variant="solid"
        w={{base: "5rem", xl: "10rem"}}
        _hover={{
            bg: "pink.400"
        }}
        >
            Remove
        </Button>
    );
};

export default RemoveButton;