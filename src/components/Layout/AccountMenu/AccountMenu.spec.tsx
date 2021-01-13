import { render, RenderResult } from "@testing-library/react";
import * as React from "react";

import AccountMenu from "@/components/Layout/AccountMenu/AccountMenu";

let documentBody: RenderResult;

describe("<AccountMenu {...props} />", () => {
    test("renders", () => {
        documentBody = render(<AccountMenu display={["flex"]}/>);

        expect(documentBody.getByRole("button")).toBeInTheDocument();
        expect(documentBody.getByText(/account/i)).toBeInTheDocument();
        expect(documentBody.getByText(/login/i)).toBeInTheDocument();
        expect(documentBody.getByText(/register/i)).toBeInTheDocument();
    });
});