import * as React from "react";

import { getStorage } from "@/utils/storage";

interface ICalculationReturn {
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleQtyDecrease: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleQtyIncrease: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleTotalCalculation: (input: Element[]) => null;
    itemPrice: number | undefined;
    total: number;
}

const useCalculateTotal = (price?: number): ICalculationReturn => {
    const CART_KEY = "cart-products";

    const [ itemPrice, setItemPrice ] = React.useState(price);

    const [ total, setTotal ] = React.useState<number>(() => {
        const products = getStorage(CART_KEY);

        if (products && products.length) {
            return products.map(product => product.price / 100)
                    .reduce((accum, curValue) => accum + curValue);
        } else {
            return 0;
        }
    });

    const handleTotalCalculation = (input: Element[]) => {
        if (!input.length) {
            setTotal(0);
            return null;
        } else {
            const currentTotal = input.map(element => parseFloat(element.textContent!.replace("Total: €", "")))
            .reduce((accum, curValue) => accum + curValue, 0);

            setTotal(currentTotal);
            return null;
        }
    };

    const handleQtyIncrease = (event: React.MouseEvent<HTMLButtonElement>) => {
        const inputElement = (event.target as HTMLButtonElement).previousElementSibling as HTMLInputElement;
        setItemPrice(parseInt(inputElement.value) * price!);
      };
  
    const handleQtyDecrease = (event: React.MouseEvent<HTMLButtonElement>) => {
        const inputElement = (event.target as HTMLButtonElement).nextElementSibling as HTMLInputElement;
        setItemPrice(parseInt(inputElement.value) * price!);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setItemPrice(parseInt((event.target as HTMLInputElement).value) * price!);
    };

    return {
        handleTotalCalculation,
        handleInputChange,
        handleQtyDecrease,
        handleQtyIncrease,
        itemPrice,
        total
    };
};

export default useCalculateTotal;