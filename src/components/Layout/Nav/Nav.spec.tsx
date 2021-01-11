import { render, RenderResult } from "@testing-library/react";
import * as React from "react";

import Nav from "@/components/Layout/Nav/Nav";

let documentBody: RenderResult;

describe("<Nav />", () => {
    test("renders", () => {
        documentBody = render(<Nav />);

        expect(documentBody.getByRole("navigation")).toBeInTheDocument();
        expect(documentBody.getByRole("heading", { name: /YourCoffeeShop/i})).toBeInTheDocument();
        expect(documentBody.getByRole("list")).toBeInTheDocument();
    });
});