import { screen } from "@testing-library/react";
import * as React from "react";

import CartDrawer from "@/components/Cart/CartDrawer/CartDrawer";

import { render } from "../../../../test-utils";
import userEvent from "@testing-library/user-event";

describe("<CartDrawer />", () => {

    test("renders in close position", () => {
        render(<CartDrawer />, null);
        
        expect(screen.getByRole("button")).toHaveTextContent(/cart/i);
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    test("opens with empty cart", () => {
        render(<CartDrawer />, null);

        userEvent.click(screen.getByRole("button"));

        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.getByRole("dialog", { name: "What's in your bag" })).toBeInTheDocument();
        expect(screen.getAllByRole("list")[6]).toContainElement(screen.getByText(/no items in cart/i));
        expect(screen.getByRole("contentinfo")).toHaveTextContent("Total: £0");
        expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
    });
});