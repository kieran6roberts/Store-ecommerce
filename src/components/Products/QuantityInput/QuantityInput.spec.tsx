import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import QuantityInput from "@/components/Products/QuantityInput/QuantityInput";

let documentBody: RenderResult;

describe("<QuantityInput {...props} />", () => {
    
    const props = {
        id: "1",
        handleQtyIncrease: jest.fn(),
        handleQtyDecrease: jest.fn(),
    };

    beforeEach(() => {
        documentBody = render(<QuantityInput {...props}/>);
    });

    test("renders", () => {
        expect(documentBody.getByRole("button", { name: "decrease quantity" })).toBeInTheDocument();
        expect(documentBody.getByRole("button", { name: "increase quantity" })).toBeInTheDocument();

        expect(documentBody.getByRole("spinbutton")).toHaveValue("1");
    });
    
    test("quantity changes with user input", () => {
        const increaseBtn = documentBody.getByRole("button", { name: "increase quantity" });
        const decreaseBtn = documentBody.getByRole("button", { name: "decrease quantity" });
        const quantityDisplayEl = documentBody.getByRole("spinbutton");

        expect(quantityDisplayEl).toHaveValue("1");
        
        userEvent.click(increaseBtn);
        
        expect(quantityDisplayEl).toHaveValue("2");

        userEvent.click(increaseBtn);
        userEvent.click(increaseBtn);

        expect(quantityDisplayEl).toHaveValue("4");
        
        userEvent.click(decreaseBtn);

        expect(quantityDisplayEl).toHaveValue("3");
    });

    test("input won't decrease below -1", () => {
        const decreaseBtn = documentBody.getByRole("button", { name: "decrease quantity" });
        const quantityDisplayEl = documentBody.getByRole("spinbutton");

        userEvent.click(decreaseBtn);
        
        expect(quantityDisplayEl).toHaveValue("0");
        
        userEvent.click(decreaseBtn);
        
        expect(quantityDisplayEl).toHaveValue("-1");
        
        userEvent.click(decreaseBtn);
        
        expect(quantityDisplayEl).toHaveValue("-1");
    });
});