import { IconButton, 
    Input, 
    InputGroup, 
    InputRightElement } from "@chakra-ui/react";
import * as React from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";

interface INPUT {
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: React.ReactElement;
    name: string;
    placeholder?: string;
    type: string;
}

function CustomInput({ handleInputChange, 
    name,
    placeholder, 
    icon, 
    type }: INPUT): React.ReactElement {
    const [ show, setShow ] = React.useState(false);

    const handlePasswordShow = () => setShow(!show);

    return (
        <InputGroup size="md">
            {type === "password" ?
            <>
            <Input focusBorderColor="blue.400"
            errorBorderColor="red.300"
            name={name}
            onChange={handleInputChange}
            placeholder={placeholder} 
            pr="4.5rem"
            variant="outline"
            type={show ? "text" : "password"}
            />
            <InputRightElement>
                {icon}
                <IconButton aria-label="toggle show password"
                height="1.5rem"
                icon={show ? <BiHide /> : <BiShowAlt />}
                size="sm"
                onClick={handlePasswordShow}
                />
            </InputRightElement>
            </>
            :
            <>
            <Input focusBorderColor="blue.400"
            errorBorderColor="red.300"
            name={name}
            onChange={handleInputChange}
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