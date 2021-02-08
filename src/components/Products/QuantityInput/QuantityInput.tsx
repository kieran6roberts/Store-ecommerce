import { Button,
    HStack,
    Input,
    useNumberInput } from "@chakra-ui/react";
import * as React from "react";

type handlerFunction = (event: React.MouseEvent<HTMLButtonElement>) => void;

interface IQuantityInput {
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleQtyDecrease: handlerFunction;
    handleQtyIncrease: handlerFunction;
    id: string;
}

const QuantityInput = ({ 
    //handleInputChange,
    handleQtyDecrease, 
    handleQtyIncrease,
    id }: IQuantityInput): React.ReactElement => {
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
            onClick={(event) => handleQtyDecrease(event)}
            {...dec}
            >
                -
            </Button>
            <Input 
            {...input}
            className="item-qty"
            id={`qty-${id}`}
            isDisabled={true}
            width="4rem" 
            />
            <Button 
            aria-label="increase quantity"
            className="qty-change"
            onClick={(event) => handleQtyIncrease(event)}
            {...inc}
            >
                +
            </Button>
        </HStack>
    );
};

export default React.memo(QuantityInput);