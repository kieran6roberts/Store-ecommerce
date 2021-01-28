import * as React from "react";

import { getStorage, setStorage } from "@/utils/storage";

const StorageContext = React.createContext<unknown | undefined>(undefined);
const StorageDispatchContext = React.createContext<unknown | undefined>(undefined);

export const useStore = () => React.useContext(StorageContext);
export const useStoreUpdate = () => React.useContext(StorageDispatchContext);

const useStorage = (key: string) => {
    const CART_KEY = "cart-products";
    const SAVED_KEY = "saved-products";

    const [ cartStorage, setCartStorage ] = React.useState(getStorage(CART_KEY));
    const [ savedStorage, setSavedStorage ] = React.useState(getStorage(SAVED_KEY));

    const toggleSavedValue = (key, value) => {
        const items = getStorage(key);
        let stateItems;

        if (!items) {
            setStorage(key, [{ "id": value }]);
        }

        if (Array.isArray(items)) {
            const filterDuplicateItems = items.filter(item => item.id !== value);
            
            if (filterDuplicateItems.length < items.length) {
                stateItems = [...filterDuplicateItems];

                setStorage(key, stateItems);
            } else {

                const addNewItems = [...items, { "id": value }];
                
                stateItems = addNewItems;
    
                setStorage(key, stateItems);
            }
        }

        setSavedStorage(stateItems);
    };

    const addCartValue = (value) => {
        const items = getStorage(key);

        if (!items) {
            setStorage(key, [value]);
        } else {

            const isItemDuplicate = items.some(item => item.id === value.id);

            if (!isItemDuplicate) {
                items.push(value);
                setStorage(key, items);
            } else {
                return;
            }
        }

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
    const { cartStorage, addCartValue } = useStorage("cart-products");
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