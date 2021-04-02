import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import * as React from "react";

import Layout from "@/components/Layout/Layout";

import { render } from "../../../test-utils";

jest.mock("next/router");

describe("<Layout />", () => {
    let expectedAsPath, expectedPathname;

    beforeEach(() => {
        expectedAsPath = "Home/store";
        expectedPathname = "/";
        (useRouter as jest.Mock).mockReturnValue({
            asPath: expectedAsPath,
            pathname: expectedPathname
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
    });
    
    test("toggle sidebar state", () => {
        render(
            <Layout>
                <h1>Header</h1>
            </Layout>
            , null);


        expect(screen.queryByRole("button", { name: /account/i })).not.toBeInTheDocument();
        
        userEvent.click(screen.getAllByRole("button")[0]);

        const sidebarWrapperEl = screen.queryByRole("dialog");
        
        expect(sidebarWrapperEl).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /account/i })).toBeInTheDocument();
    });  
});