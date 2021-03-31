import { render, RenderResult } from "@testing-library/react";
import * as React from "react";

import Footer from "@/components/Layout/Footer/Footer";

let documentBody: RenderResult;

describe("<Nav />", () => {
    test("renders", () => {
        documentBody = render(<Footer user={null} />);

        expect(documentBody.getByText(/kieran's coffee collection @2021/i)).toBeInTheDocument();
        expect(documentBody.getByText("Login")).toBeInTheDocument();
        expect(documentBody.getAllByRole("list")[0]).toBeInTheDocument();
        expect(documentBody.getAllByRole("list")[1]).toBeInTheDocument();
        expect(documentBody.getAllByRole("listitem")[0]).toBeInTheDocument();
        expect(documentBody.getAllByRole("listitem")[1]).toBeInTheDocument();
        expect(documentBody.getAllByRole("listitem")[2]).toBeInTheDocument();
        expect(documentBody.getAllByRole("listitem")[3]).toBeInTheDocument();
    });
});