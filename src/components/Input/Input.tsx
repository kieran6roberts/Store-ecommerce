import { Button, 
    Input, 
    InputGroup, 
    InputRightElement,
    Text } from "@chakra-ui/react";
import * as React from "react";

interface INPUT {
    icon?: React.ReactElement,
    placeholder?: string,
    type: string,
}

function CustomInput({ placeholder, icon, type }: INPUT): React.ReactElement {
    const [ show, setShow ] = React.useState(false);

    function handlePasswordShow() {
        setShow(!show);
    }

    return (
        <InputGroup size="md">
            {type === "password" ?
            <>
            <Input focusBorderColor="blue.400"
            errorBorderColor="red.300"
            placeholder={placeholder} 
            pr="4.5rem"
            variant="outline"
            type={show ? "text" : "password"}
            />
            <InputRightElement width="4.5rem">
                {icon}
                <Button height="1.5rem"
                size="sm"
                onClick={handlePasswordShow}
                >
                    {show ? "Hide" : "Show"}
                </Button>
            </InputRightElement>
            </>
            :
            <>
            <Input focusBorderColor="blue.400"
            errorBorderColor="red.300"
            placeholder={placeholder} 
            variant="outline"
            type={type}
            />
            <InputRightElement>
                {icon}
            </InputRightElement>
            </>}
        </InputGroup>
    );
}

export default CustomInput;