import { render, RenderResult } from "@testing-library/react";
import * as React from "react";

import CurrentUser from "@/components/Layout/CurrentUser/CurrentUser";

let documentBody: RenderResult;

describe("<CurrentUser {...props} />", () => {
    const props = {
        nickname: "Kieran",
        picture: "user image"
    };

    test("renders with user prop", () => {
        documentBody = render(<CurrentUser user={props} />);

        expect(documentBody.getByText("Kieran")).toBeInTheDocument();
        expect(documentBody.getByRole("img")).toBeInTheDocument();
    });
    test("renders without as guest", () => {
        documentBody = render(<CurrentUser user={null} />);
        
        expect(documentBody.getByText(/Logged in as: Guest/i)).toBeInTheDocument();
        expect(documentBody.queryByRole("img")).not.toBeInTheDocument();
    });
});