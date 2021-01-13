import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import Input from "@/components/Input/Input";

let documentBody: RenderResult;

describe("<Nav />", () => {
    const textProps = {
        handleInputChange: () => jest.fn(),
        icon: <button>icon</button>,
        name: "name",
        placeholder: "name...",
        type: "text",
    };

    const passwordProps = {
        handleInputChange: () => jest.fn(),
        icon: <button>icon</button>,
        name: "password",
        placeholder: "password...",
        type: "password",
    };

    test("renders text input", () => {
        documentBody = render(<Input {...textProps}/>);

        expect(documentBody.getByRole("textbox")).toBeInTheDocument();
        expect(documentBody.getByRole("button", { name: /icon/ })).toBeInTheDocument();
    });

    test("renders password input", () => {
        documentBody = render(<Input {...passwordProps}/>);
        
        expect(documentBody.getByPlaceholderText("password...")).toBeInTheDocument();
        expect(documentBody.getByRole("button", { name: /icon/ })).toBeInTheDocument();
    });
    
    test("toggle password visiblity", () => {
        documentBody = render(<Input {...passwordProps}/>);

        expect(documentBody.queryByRole("textbox")).not.toBeInTheDocument();

        userEvent.click(documentBody.getByRole("button", { name: /toggle show password/i }));
        
        expect(documentBody.getByRole("textbox")).toBeInTheDocument();
        
        userEvent.click(documentBody.getByRole("button", { name: /toggle show password/i }));

        expect(documentBody.queryByRole("textbox")).not.toBeInTheDocument();
    });

    test("input updates", () => {
        documentBody = render(<Input {...textProps}/>);

        userEvent.type(documentBody.getByRole("textbox"), "kieran");

        expect(documentBody.getByRole("textbox")).toHaveValue("kieran");
    });
});