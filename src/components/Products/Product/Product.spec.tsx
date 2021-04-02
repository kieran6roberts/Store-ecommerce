import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import * as React from "react";

import Product from "@/components/Products/Product/Product";

import { render } from "../../../../test-utils";

jest.mock("next/router");

describe("<Product {...props} />", () => {
    let expectedPathname;

    const props = {
        category: "beans",
        description: "500g coffee beans",
        image: "beans.webp",
        id: "1",
        name: "Best Beans",
        price: 1999,
    };

    beforeEach(() => {
        expectedPathname = "/store";
        (useRouter as jest.Mock).mockReturnValue({
            pathname: expectedPathname
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders with props", () => {
        render(<Product {...props}/>, null);

        expect(screen.getByAltText("Best Beans")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "save item" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
        expect(screen.getByText("Best Beans")).toBeInTheDocument();
        expect(screen.getByText(/€19.99/)).toBeInTheDocument();
    });

    test("btn clicks", () => {
        render(<Product {...props}/>, null);

        expect(window.localStorage.getItem).toHaveBeenCalledTimes(4);
        expect(window.localStorage.setItem).toHaveBeenCalledTimes(0);
        
        const saveBtn = screen.getByRole("button", { name: "save item" });
        const addToCartBtn = screen.getByRole("button", { name: /add to cart/i });
        
        userEvent.click(saveBtn);
        
        expect(window.localStorage.getItem).toHaveBeenCalledTimes(9);
        expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);

        userEvent.click(addToCartBtn);

        expect(window.localStorage.getItem).toHaveBeenCalledTimes(14);
        expect(window.localStorage.setItem).toHaveBeenCalledTimes(2);
    });
});