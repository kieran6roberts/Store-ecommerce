import { render, RenderResult } from "@testing-library/react";
import * as React from "react";

import Footer from "@/components/Layout/Footer/Footer";

let documentBody: RenderResult;

describe("<Nav />", () => {
    test("renders", () => {
        documentBody = render(<Footer />);

        expect(documentBody.getByText(/YourCoffeeShop/i)).toBeInTheDocument();
        expect(documentBody.getByRole("list")).toBeInTheDocument();
    });
});