import { render, RenderResult } from "@testing-library/react";
import * as React from "react";

import AccountMenu from "@/components/Layout/AccountMenu/AccountMenu";

let documentBody: RenderResult;

describe("<AccountMenu {...props} />", () => {
    const user = {
        user: {
            nickname: "Kieran"
        }
    };

    test("renders with user", () => {
        documentBody = render(<AccountMenu display={["flex"]} user={user} />);
        
        expect(documentBody.getByRole("button")).toBeInTheDocument();
        expect(documentBody.getByText(/account/i)).toBeInTheDocument();
        expect(documentBody.getByText("Logout")).toBeInTheDocument();
    });
    
    test("renders without user", () => {
        documentBody = render(<AccountMenu display={["flex"]} user={null} />);
        
        expect(documentBody.getByRole("button")).toBeInTheDocument();
        expect(documentBody.getByText(/account/i)).toBeInTheDocument();
        expect(documentBody.getByText("Login/Register")).toBeInTheDocument();
    });
});