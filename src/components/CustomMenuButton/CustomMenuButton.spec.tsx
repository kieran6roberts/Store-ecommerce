import { render, RenderResult } from "@testing-library/react";
import * as React from "react";

import CustomMenuButton from "@/components/CustomMenuButton/CustomMenuButton";
import { MenuItem } from "@chakra-ui/menu";

let documentBody: RenderResult;

describe("<CustomMenuButton {...props}/>", () => {
    const props = "Product Type";

    test("renders", () => {
        documentBody = render(<CustomMenuButton title={props} >
            <MenuItem>
                Menu Item
            </MenuItem>
        </CustomMenuButton>);

        expect(documentBody.getByRole("button")).toHaveTextContent("Product Type");
        expect(documentBody.getByText("Menu Item")).toBeInTheDocument();
    });

    test("renders without props", () => {
        documentBody = render(<CustomMenuButton />);

        expect(documentBody.getByRole("button")).toHaveTextContent("No title");
    });
});