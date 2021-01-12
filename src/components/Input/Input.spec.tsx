import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import Input from "@/components/Input/Input";

let documentBody: RenderResult;

describe("<Nav />", () => {
    const textProps = {
        placeholder: "name...",
        type: "text",
        icon: <button>icon</button>
    };

    const passwordProps = {
        placeholder: "password...",
        type: "password",
        icon: <button>icon</button>
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
    
    test("toggle passwors visiblity", () => {
        documentBody = render(<Input {...passwordProps}/>);

        expect(documentBody.queryByRole("textbox")).not.toBeInTheDocument();

        userEvent.click(documentBody.getByRole("button", { name: /show/i}));
        
        expect(documentBody.getByRole("textbox")).toBeInTheDocument();
        
        userEvent.click(documentBody.getByRole("button", { name: /hide/i}));

        expect(documentBody.queryByRole("textbox")).not.toBeInTheDocument();
    });

    test("input updates", () => {
        documentBody = render(<Input {...textProps}/>);

        userEvent.type(documentBody.getByRole("textbox"), "kieran");

        expect(documentBody.getByRole("textbox")).toHaveValue("kieran");
    });
});