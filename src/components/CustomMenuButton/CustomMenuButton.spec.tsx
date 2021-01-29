import { render, RenderResult } from "@testing-library/react";
import * as React from "react";

import CustomMenuButton from "@/components/CustomMenuButton/CustomMenuButton";

let documentBody: RenderResult;

describe("<CustomMenuButton {...props}/>", () => {
    const props = {
        title: "Product Type",
        listItems: ["Beans", "Powder"]
    };

    test("renders", () => {
        documentBody = render(<CustomMenuButton {...props} />);

        expect(documentBody.getByRole("button")).toHaveTextContent("Product Type");
        expect(documentBody.getByText("Beans")).toBeInTheDocument();
        expect(documentBody.getByText("Powder")).toBeInTheDocument();
    });

    test("renders without props", () => {
        documentBody = render(<CustomMenuButton />);

        expect(documentBody.getByRole("button")).toHaveTextContent("No title");
    });
});