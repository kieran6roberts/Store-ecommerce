import { Button,
    HStack,
    Input,
    useNumberInput } from "@chakra-ui/react";
import * as React from "react";

const QuantityInput = (): React.ReactElement => {
    const {
        getInputProps,
        getIncrementButtonProps,
        getDecrementButtonProps,
      } = useNumberInput({
        step: 1,
        defaultValue: 0,
        min: 0,
        max: 30,
        precision: 0,
      });

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();

    return (
        <HStack maxW="225px" mx="auto">
            <p>
                Qty
            </p>
            <Button {...dec}>
                -
            </Button>
            <Input {...input} />
            <Button {...inc}>
                +
            </Button>
        </HStack>
    );
};

export default QuantityInput;