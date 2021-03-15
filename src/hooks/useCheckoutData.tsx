import * as React from "react";

import { ICheckoutInputs } from "@/components/Forms/CheckoutForm/CheckoutForm";

type UpdateType = (submission: ICheckoutInputs) => void;
type CheckoutContextType = { userDetails: ICheckoutInputs | undefined };
type CheckoutDispatchContextType = { handleUpdateDetails: UpdateType };

const CheckoutDataContext = React.createContext<CheckoutContextType | undefined>(undefined);
const CheckoutDataDispatchContext = React.createContext<CheckoutDispatchContextType | undefined>(undefined);

export const useCheckout = (): CheckoutContextType | undefined => React.useContext(CheckoutDataContext);
export const useCheckoutUpdate = (): CheckoutDispatchContextType | undefined => React.useContext(CheckoutDataDispatchContext);

const useCheckoutData = () => {
    const [ userDetails, setUserDetails ] = React.useState<ICheckoutInputs | undefined>();

    const handleUpdateDetails: UpdateType = (submission) => setUserDetails(submission);

    return {
        handleUpdateDetails,
        userDetails
    };
};

const CheckoutDataProvider = ({ children }: { children: React.ReactNode}): React.ReactElement => {
    const { handleUpdateDetails, userDetails } = useCheckoutData();

    return (
        <CheckoutDataContext.Provider value={{ userDetails }}>
            <CheckoutDataDispatchContext.Provider value={{ handleUpdateDetails }}>
                {children}
            </CheckoutDataDispatchContext.Provider>
        </CheckoutDataContext.Provider>
    );
};

export default CheckoutDataProvider;