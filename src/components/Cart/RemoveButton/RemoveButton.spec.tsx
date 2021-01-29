import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import RemoveButton from "@/components/Cart/RemoveButton/RemoveButton";

let documentBody: RenderResult;

describe("<RemoveButton {...props}", () => {
    test("renders", () => {
        const callbackMock = jest.fn();

        documentBody = render(<RemoveButton callback={callbackMock} />);
        
        expect(documentBody.getByRole("button")).toHaveTextContent(/remove/i)
    });
    
    test("callback runs on btn click", () => {
        const callbackMock = jest.fn();

        documentBody = render(<RemoveButton callback={callbackMock} />);

        expect(documentBody.getByRole("button")).toHaveTextContent(/remove/i);
        
        expect(callbackMock).not.toHaveBeenCalled();
        
        userEvent.click(documentBody.getByRole("button"));
        
        expect(callbackMock).toHaveBeenCalledTimes(1);

    });
});