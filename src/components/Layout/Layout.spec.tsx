import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import Layout from "@/components/Layout/Layout";

let documentBody: RenderResult;

describe("<Nav />", () => {
    test("renders", () => {
        documentBody = render(<Layout ><h1>Header</h1></Layout>);
        
        expect(documentBody.getByRole("navigation")).toBeInTheDocument();
        expect(documentBody.getByRole("heading", { name: /header/i})).toBeInTheDocument();
        expect(documentBody.getByText(/YourCoffeeShop @2021/i)).toBeInTheDocument();
    });
    
    test("toggle sidebar state", () => {
        documentBody = render(<Layout ><h1>Header</h1></Layout>);

    });
});