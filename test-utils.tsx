import { render } from "@testing-library/react";
import React from "react";

import StorageProvider from "@/hooks/useStorage";

const renderWithContext = ({ children }: { children: React.ReactNode}) => {
    return (
        <StorageProvider>
            {children}
        </StorageProvider>
    );
};

const customRender = (ui: React.ReactElement<any>, options: any): any => {
    render(ui, {
        wrapper: renderWithContext,
        ...options
    });
};

export {
    customRender as render
};