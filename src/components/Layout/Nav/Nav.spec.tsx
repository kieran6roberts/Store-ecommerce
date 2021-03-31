import { render, RenderResult } from "@testing-library/react";
import { useRouter } from "next/router";
import * as React from "react";

import Nav from "@/components/Layout/Nav/Nav";

let documentBody: RenderResult;

jest.mock("next/router");

describe("<Nav />", () => {
    let expectedAsPath;

    beforeEach(() => {
        expectedAsPath = "Home/store";
        (useRouter as jest.Mock).mockReturnValue({
            asPath: expectedAsPath
        });
    });

    const user = {
        user: {
            nickname: "Kieran"
        }
    };

    test("renders", () => {
        const mockOpen = jest.fn();
        
        documentBody = render(<Nav 
            onOpen={mockOpen} 
            user={user} 
            userLoading={false}
            />);

        expect(documentBody.getByRole("navigation")).toBeInTheDocument();
        expect(documentBody.getByRole("heading", { name: /kieran's coffee collection/i})).toBeInTheDocument();
        expect(documentBody.getAllByRole("list")[0]).toBeInTheDocument();
        expect(documentBody.getAllByRole("list")[1]).toBeInTheDocument();
    });
});