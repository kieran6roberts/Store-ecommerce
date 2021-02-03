import { render, RenderResult } from "@testing-library/react";
import * as React from "react";
import TestRenderer from "react-test-renderer";

import Hero from "@/components/Hero/Hero";

let documentBody: RenderResult;

describe("<Hero />", () => {
    test("renders", () => {
        documentBody = render(<Hero />);

        const h1Element = documentBody.getByRole("heading", { 
            name: "Bringing you the best coffee from all over the world"
        });

        expect(h1Element).toBeInTheDocument();
        expect(documentBody.getByRole("article")).toContainElement(h1Element);
    });

    test("snapshot", () => {
        const tree = TestRenderer
        .create(<Hero />)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });
});