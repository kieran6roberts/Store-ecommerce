import { render, RenderResult } from "@testing-library/react";
import * as React from "react";

import Nav from "@/components/Layout/Nav/Nav";

let documentBody: RenderResult;

describe("<Nav />", () => {
    test("renders", () => {
        const mockOpen = jest.fn();
        documentBody = render(<Nav onOpen={mockOpen}/>);

        expect(documentBody.getByRole("navigation")).toBeInTheDocument();
        expect(documentBody.getByRole("heading", { name: /YourCoffeeShop/i})).toBeInTheDocument();
        expect(documentBody.getAllByRole("list")[0]).toBeInTheDocument();
        expect(documentBody.getAllByRole("list")[1]).toBeInTheDocument();
    });
});