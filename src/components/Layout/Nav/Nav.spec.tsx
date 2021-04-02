import { screen } from "@testing-library/react";
import { useRouter } from "next/router";
import * as React from "react";

import Nav from "@/components/Layout/Nav/Nav";

import { render } from "../../../../test-utils";

jest.mock("next/router");

describe("<Nav />", () => {
    let expectedAsPath, expectedPathname;

    beforeEach(() => {
        expectedAsPath = "Home/store";
        expectedPathname = "/";
        (useRouter as jest.Mock).mockReturnValue({
            asPath: expectedAsPath,
            pathname: expectedPathname
        });
    });

    const user = {
        user: {
            nickname: "Kieran"
        }
    };

    test("renders", () => {
        const mockOpen = jest.fn();
        
        render(<Nav 
            onOpen={mockOpen} 
            user={user} 
            userLoading={false}
            />, null);

        expect(screen.getByRole("navigation")).toBeInTheDocument();
        expect(screen.getByText(/kieran's coffee collection/i)).toBeInTheDocument();
        expect(screen.getAllByRole("list")[0]).toBeInTheDocument();
        expect(screen.getAllByRole("list")[1]).toBeInTheDocument();
        expect(screen.getByAltText("Kieran's Coffee Collection logo in pink with white brand name text")).toBeInTheDocument();
    });
});