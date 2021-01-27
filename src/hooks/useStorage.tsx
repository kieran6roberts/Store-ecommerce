import * as React from "react";

import { getStorage, setStorage } from "@/utils/storage";

const StorageContext = React.createContext<unknown | undefined>(undefined);
const StorageDispatchContext = React.createContext<unknown | undefined>(undefined);

export const useStore = () => React.useContext(StorageContext);
export const useStoreUpdate = () => React.useContext(StorageDispatchContext);

const useStorage = (key: string) => {
    const CART_KEY = "cart";
    const SAVED_KEY = "saved";

    const [ cartStorage, setCartStorage ] = React.useState(getStorage(CART_KEY));
    const [ savedStorage, setSavedStorage ] = React.useState(getStorage(SAVED_KEY));

    const toggleSavedValue = (subKey: string, value: string) => {
        const items = getStorage(key);
        let stateItems;

        if (!items) {
            setStorage(key, [{ subKey, value }]);
        }

        if (Array.isArray(items)) {
            const filterDuplicateItems = items.filter(product => product.id !== subKey);
            
            if (filterDuplicateItems.length < items.length) {
                stateItems = [...filterDuplicateItems];

                setStorage(key, filterDuplicateItems);
            }
            
            const addNewItems = [...items, { subKey: value }];
            
            stateItems = addNewItems;

            setStorage(key, addNewItems);
            setSavedStorage(addNewItems);
        }

        setSavedStorage(stateItems);
    };

    const addCartValue = (value) => {
        const items = getStorage(key);

        if (!items) {
            setStorage(key, value);
        }

        items.push(value);

        setStorage(key, items);

        setCartStorage(items);
    };


    return {
        addCartValue,
        cartStorage,
        savedStorage,
        toggleSavedValue
    };
};

const StorageProvider = ({ children }: { children: React.ReactNode}): React.ReactElement  => {
    const { cartStorage, addCartValue } = useStorage("cart");
    const { savedStorage, toggleSavedValue } = useStorage("saved-products");

    return (
        <StorageContext.Provider value={{ cartStorage, savedStorage, }} >
            <StorageDispatchContext.Provider value={{ addCartValue, toggleSavedValue}}>
                {children} 
            </StorageDispatchContext.Provider>
        </StorageContext.Provider>
    );
};

export default StorageProvider;