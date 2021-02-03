import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import * as React from "react";

import Layout from "@/components/Layout/Layout";

import { render } from "../../../test-utils";

jest.mock("next/router");

describe("<Layout />", () => {
    let expectedAsPath;

    beforeEach(() => {
        expectedAsPath = "Home/store";
        (useRouter as jest.Mock).mockReturnValue({
            asPath: expectedAsPath
        });
    });

    test("renders", () => {
        render(
            <Layout>
                <h1>Header</h1>
            </Layout>
            , null);
        
        expect(screen.getByRole("navigation")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /header/i})).toBeInTheDocument();
        expect(screen.getByText(/YourCoffeeShop @2021/i)).toBeInTheDocument();
    });
    
    test("toggle sidebar state", () => {
        render(
            <Layout>
                <h1>Header</h1>
            </Layout>
            , null);


        expect(screen.queryByPlaceholderText("coffee beans...")).not.toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: /looking for something?/i })).not.toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: /categories/i })).not.toBeInTheDocument();
        
        userEvent.click(screen.getAllByRole("button")[0]);

        const sidebarWrapperEl = screen.queryByRole("dialog");
        
        expect(sidebarWrapperEl).toBeInTheDocument();
        expect(screen.getByPlaceholderText("coffee beans...")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /looking for something?/i})).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /categories/i})).toBeInTheDocument();

        const sidebarBtn = screen.getAllByRole("button")[1];

        userEvent.click(sidebarBtn);
        
        expect(sidebarWrapperEl).toHaveAttribute("style", expect.stringContaining("translateX(-100%)"));
    });  
});