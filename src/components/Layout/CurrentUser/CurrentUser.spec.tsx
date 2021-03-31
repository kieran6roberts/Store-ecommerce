import { render, RenderResult } from "@testing-library/react";
import * as React from "react";

import CurrentUser from "@/components/Layout/CurrentUser/CurrentUser";

let documentBody: RenderResult;

describe("<CurrentUser {...props} />", () => {
    const props = {
        justify: "center",
        user: {
            nickname: "Kieran",
            picture: "picture.png"
        },
        userLoading: false
    };

    test("renders with user prop", () => {
        documentBody = render(<CurrentUser {...props} />);

        expect(documentBody.getByText("Kieran")).toBeInTheDocument();
        expect(documentBody.getByRole("img")).toBeInTheDocument();
    });
    test("renders without as guest", () => {
        documentBody = render(<CurrentUser justify="flex-start" userLoading={false} />);
        
        expect(documentBody.getByText(/guest/i)).toBeInTheDocument();
        expect(documentBody.queryByRole("img")).not.toBeInTheDocument();
    });
});