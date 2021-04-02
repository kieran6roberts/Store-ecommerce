import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import CartItem from "@/components/Cart/CartItem/CartItem";

import { render } from "../../../../test-utils";

describe("<CartItem {...props} />", () => {
    const props = {
        category: "Beans",
        description: "Really nice coffee beans",
        hideEdit: false,
        id: "1",
        image: "image.png",
        name: "Blue Beans",
        price: 1999
    };

    test("renders with props", () => {
        render(<CartItem {...props}/>, null);

        expect(screen.getByText(/really nice coffee beans/i)).toBeInTheDocument();
        expect(screen.getByText(/blue beans/i)).toBeInTheDocument();
        expect(screen.getByText(/19.99/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /remove/i })).toBeInTheDocument();
        expect(screen.getByAltText("product image")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "decrease quantity" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "increase quantity" })).toBeInTheDocument();
    });

    test("remove btn triggers cart storage removal", () => {
        render(<CartItem {...props}/>, null);

        expect(window.localStorage.getItem).toHaveBeenCalled();
        expect(window.localStorage.setItem).not.toHaveBeenCalled();
        
        userEvent.click(screen.getByRole("button", { name: /remove/i }));

        expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
    });

    test("price updates with quantity", () => {
        render(<CartItem {...props}/>, null);

        const increaseBtn = screen.getByRole("button", { name: "increase quantity" });
        const decreaseBtn = screen.getByRole("button", { name: "decrease quantity" });

        userEvent.click(increaseBtn);
        
        expect(screen.getByText(/39.98/)).toBeInTheDocument();
        expect(screen.queryByText(/19.99/)).not.toBeInTheDocument();
        
        userEvent.click(decreaseBtn);

        expect(screen.queryByText(/39.98/)).not.toBeInTheDocument();
        expect(screen.getByText(/19.99/)).toBeInTheDocument();
        
        userEvent.click(decreaseBtn);

        expect(screen.queryByText(/19.99/)).not.toBeInTheDocument();
        expect(screen.getByText("Total: €0")).toBeInTheDocument();
    });
});