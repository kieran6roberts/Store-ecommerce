import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import * as React from "react";

import CartDrawer from "@/components/Cart/CartDrawer/CartDrawer";

import { render } from "../../../../test-utils";

jest.mock("next/router");

describe("<CartDrawer />", () => {
    let expectedPathname;

    beforeEach(() => {
        expectedPathname = "/";
        (useRouter as jest.Mock).mockReturnValue({
            pathname: expectedPathname
        });
    });

    test("renders in close position", () => {
        const paths = ["/cart", "/checkout", "/checkout/shipping", "/checkout/review"];

        render(<CartDrawer />, null);
        
        expect(screen.getByRole("button")).toHaveTextContent(/cart/i);
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    test("opens with empty cart", () => {
        const paths = ["/cart", "/checkout", "/checkout/shipping", "/checkout/review"];

        render(<CartDrawer />, null);

        userEvent.click(screen.getByRole("button"));

        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.getByRole("dialog", { name: "What's in your bag" })).toBeInTheDocument();
        expect(screen.getAllByRole("list")[6]).toContainElement(screen.getByText(/your cart is currently empty/i));
        expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
    });
});