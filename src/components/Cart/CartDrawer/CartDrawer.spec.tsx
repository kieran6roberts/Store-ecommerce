import { screen } from "@testing-library/react";
import * as React from "react";

import CartDrawer from "@/components/Cart/CartDrawer/CartDrawer";

import { render } from "../../../../test-utils";

describe("<CartDrawer />", () => {

    test("renders", () => {
        render(<CartDrawer />, null);
        
        expect(screen.getByText("No items in cart")).toBeInTheDocument();
    });
});