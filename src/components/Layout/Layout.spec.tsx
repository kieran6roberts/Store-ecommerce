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


        expect(documentBody.queryByPlaceholderText("coffee beans...")).not.toBeInTheDocument();
        expect(documentBody.queryByRole("heading", { name: /looking for something?/i})).not.toBeInTheDocument();
        expect(documentBody.queryByRole("heading", { name: /categories/i})).not.toBeInTheDocument();
        
        userEvent.click(documentBody.getByRole("button"));

        const sidebarWrapperEl = documentBody.queryByRole("dialog");
        
        expect(sidebarWrapperEl).toBeInTheDocument();
        expect(documentBody.getByPlaceholderText("coffee beans...")).toBeInTheDocument();
        expect(documentBody.getByRole("heading", { name: /looking for something?/i})).toBeInTheDocument();
        expect(documentBody.getByRole("heading", { name: /categories/i})).toBeInTheDocument();

        const sidebarBtn = documentBody.getAllByRole("button")[1];

        userEvent.click(sidebarBtn);
        
        expect(sidebarWrapperEl).toHaveAttribute("style", expect.stringContaining("translateX(-100%)"));
    });  
});