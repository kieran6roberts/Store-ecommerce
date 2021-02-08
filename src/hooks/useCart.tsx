import * as React from "react";

import { getStorage } from "@/utils/storage";

const useCart = () => {
    const CART_KEY = "cart-products";

    const [ total, setTotal ] = React.useState(() => {
        const products = getStorage(CART_KEY);

        if (products && products.length) {
            return products.map(product => product.price)
                    .reduce((accum, curValue) => accum + curValue);
        } else {
            return 0;
        }
    });

    const handleTotalCalculation = (input: Element[]) => {
        if (!input.length) {
            return 0;
        } else {
            const currentTotal = input.map(element => parseInt(element.textContent!.replace("Total: £", "")))
            .reduce((accum, curValue) => accum + curValue, 0);

            setTotal(currentTotal);
        }
    };

    return {
        handleTotalCalculation,
        total
    };
};

export default useCart;