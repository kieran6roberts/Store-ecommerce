import { RenderResult } from "@testing-library/react";
import * as React from "react";

import CartDrawer from "@/components/Cart/CartDrawer/CartDrawer";
import { render } from "../../../../test-utils";

let documentBody: RenderResult;


describe("<CartDrawer />", () => {

    test("renders", () => {
        documentBody = render(<CartDrawer />, null);
        expect(1).toBe(1);
    });
});