import { IconButton, 
    Input, 
    InputGroup, 
    InputRightElement } from "@chakra-ui/react";
import * as React from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";

interface IInput {
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: React.ReactElement;
    name: string;
    placeholder?: string;
    type: string;
}

function CustomInput({ 
    handleInputChange, 
    icon, 
    name,
    placeholder, 
    type }: IInput): React.ReactElement {
    const [ show, setShow ] = React.useState(false);

    const handlePasswordShow = () => setShow(!show);

    return (
        <InputGroup size="md">
            {type === "password" ?
            <>
            <Input 
            focusBorderColor="blue.400"
            errorBorderColor="red.300"
            name={name}
            onChange={handleInputChange}
            placeholder={placeholder} 
            pr="4.5rem"
            type={show ? "text" : "password"}
            variant="outline"
            />
            <InputRightElement>
                {icon}
                <IconButton 
                aria-label="toggle show password"
                height="1.5rem"
                icon={show ? <BiHide /> : <BiShowAlt />}
                onClick={handlePasswordShow}
                size="sm"
                />
            </InputRightElement>
            </>
            :
            <>
            <Input 
            focusBorderColor="blue.400"
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