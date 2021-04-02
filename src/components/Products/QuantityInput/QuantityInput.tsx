import { Box,
    Button,
    HStack,
    Input,
    useNumberInput } from "@chakra-ui/react";
import * as React from "react";

type handlerFunction = (event: React.MouseEvent<HTMLButtonElement>) => void;

interface IQuantityInput {
    handleQtyDecrease: handlerFunction;
    handleQtyIncrease: handlerFunction;
    id: string;
}

const QuantityInput = ({ 
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
        <>
        <Box 
        as="p"
        fontSize="sm"
        textAlign="center"
        >
            Quantity
        </Box>
        <HStack 
        display="flex"
        fontSize="sm"
        maxW="250px" 
        my={{xl: 2}}
        spacing={{base: 2, xl: 6}}
        >
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
            width="3rem" 
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
        
            </>
    );
};

export default React.memo(QuantityInput);