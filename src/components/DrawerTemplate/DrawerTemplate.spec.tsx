import { screen } from "@testing-library/react";
import * as React from "react";

import DrawerTemplate from "@/components/DrawerTemplate/DrawerTemplate";

import { render } from "../../../test-utils";

describe("<DrawerTemplate {...props}/>", () => {
    test("renders in open state", () => {
        const props = {
            header: "Cart Drawer",
            footer: "Cart Footer",
            isOpen: true,
            onClose: jest.fn(),
            overlay: true,
        };

        render(
            <DrawerTemplate {...props}>
                <main>
                    child elements
                </main>
            </DrawerTemplate>
            , null);

        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.getByRole("banner")).toHaveTextContent(/cart drawer/i);
        expect(screen.getByRole("main")).toHaveTextContent(/child elements/i);
        expect(screen.getByRole("contentinfo")).toHaveTextContent(/cart footer/i);
    });

    test("not in the DOM initially with isOpen = false", () => {
        const props = {
            header: "Cart Drawer",
            footer: "Cart Footer",
            isOpen: false,
            onClose: jest.fn(),
            overlay: true,
        };

        render(
            <DrawerTemplate {...props}>
                <main>
                    child elements
                </main>
            </DrawerTemplate>
            , null);
            
            expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
            expect(screen.queryByRole("heading")).not.toBeInTheDocument();
            expect(screen.queryByRole("main")).not.toBeInTheDocument();
            expect(screen.queryByText(/cart footer/i)).not.toBeInTheDocument();
    });
});