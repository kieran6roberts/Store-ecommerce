import { Button } from "@chakra-ui/react";
import * as React from "react";
import { ImCancelCircle } from "react-icons/im";

import { IMouseEventOnHTMLElement } from "@/components/Products/Products";

interface IRemoveButton {
    callback: (event: IMouseEventOnHTMLElement) => void;
}

const RemoveButton: React.FC<IRemoveButton> = ({ callback }) => {
    return (
        <Button 
        color="red.300"
        fontSize="xs"
        onClick={(event) => callback(event)}
        leftIcon={<ImCancelCircle />}
        variant="outline"
        >
            Remove
        </Button>
    );
};

export default RemoveButton;