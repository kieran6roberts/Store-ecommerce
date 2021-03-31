import { render, RenderResult } from "@testing-library/react";
import * as React from "react";

import CustomMenuButton from "@/components/CustomMenuButton/CustomMenuButton";

let documentBody: RenderResult;

describe("<CustomMenuButton {...props}/>", () => {
    const props = "Product Type";

    test("renders", () => {
        documentBody = render(<CustomMenuButton title={props} ></CustomMenuButton>);

        expect(documentBody.getByRole("button")).toHaveTextContent("Product Type");
    });

    test("renders without props", () => {
        documentBody = render(<CustomMenuButton />);

        expect(documentBody.getByRole("button")).toHaveTextContent("No title");
    });
});