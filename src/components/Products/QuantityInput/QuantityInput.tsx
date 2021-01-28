import { Button,
    HStack,
    Input,
    useNumberInput } from "@chakra-ui/react";
import * as React from "react";

interface IQuantityInput {
    updatePrice: () => void;
}

const QuantityInput = ({ updatePrice }: IQuantityInput): React.ReactElement => {
    const {
        getInputProps,
        getIncrementButtonProps,
        getDecrementButtonProps,
      } = useNumberInput({
        step: 1,
        defaultValue: 1,
        min: -1,
        max: 30,
        precision: 0,
      });

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();

    return (
        <HStack maxW="250px" mx="auto">
            <p>
                Qty
            </p>
            <Button 
            {...dec}
            onClick={(event) => updatePrice(event)}
            >
                -
            </Button>
            <Input 
            {...input} 
            width="4rem" 
            />
            <Button 
            onClick={(event) => updatePrice(event)}
            {...inc}
            >
                +
            </Button>
        </HStack>
    );
};

export default QuantityInput;