import { render, RenderResult } from "@testing-library/react";
import * as React from "react";

import Rating from "@/components/Products/Rating/Rating";

let documentBody: RenderResult;

describe("<Rating />", () => {
    test("renders", () => {
        documentBody = render(<Rating />);

        expect(documentBody.getAllByRole("button")[0]).toBeInTheDocument();
        expect(documentBody.getAllByRole("button")[1]).toBeInTheDocument();
        expect(documentBody.getAllByRole("button")[2]).toBeInTheDocument();
        expect(documentBody.getAllByRole("button")[3]).toBeInTheDocument();
        expect(documentBody.getAllByRole("button")[4]).toBeInTheDocument();
    });
});