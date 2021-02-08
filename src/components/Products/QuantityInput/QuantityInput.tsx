import { Button,
    HStack,
    Input,
    useNumberInput } from "@chakra-ui/react";
import * as React from "react";

interface IQuantityInput {
    id: string;
    updatePrice: (event: React.MouseEvent<HTMLButtonElement>, number: string) => void;
}

const QuantityInput = ({ id, updatePrice }: IQuantityInput): React.ReactElement => {
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
        <HStack 
        maxW="250px" 
        mx="auto"
        >
            <p>
                Qty
            </p>
            <Button 
            aria-label="decrease quantity"
            className="qty-change"
            {...dec}
            onClick={updatePrice}
            >
                -
            </Button>
            <Input 
            {...input}
            className="item-qty"
            id={`qty-${id}`}
            width="4rem" 
            />
            <Button 
            aria-label="increase quantity"
            className="qty-change"
            onClick={updatePrice}
            {...inc}
            >
                +
            </Button>
        </HStack>
    );
};

export default React.memo(QuantityInput);