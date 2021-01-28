import * as React from "react";

import { IMouseEventOnHTMLElement } from "@/components/Products/Products";
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
            setStorage(key, [value]);
        }

        if (Array.isArray(items)) {
            const filterDuplicateItems = items.filter(item => item.id !== value.id);
            
            if (filterDuplicateItems.length < items.length) {
                stateItems = [...filterDuplicateItems];

                setStorage(key, stateItems);
            } else {

                const addNewItems = [...items, value];
                
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

    const removeCartValue = (event: IMouseEventOnHTMLElement) => {
        const items = getStorage(key);

        const productElementId = event.target.closest("li")?.id;

        const newStorage = items?.filter(item => item.id !== productElementId);

        setStorage(key, newStorage);
        setCartStorage(newStorage);
    };

    return {
        addCartValue,
        cartStorage,
        removeCartValue,
        savedStorage,
        toggleSavedValue
    };
};

const StorageProvider = ({ children }: { children: React.ReactNode}): React.ReactElement  => {
    const { cartStorage, addCartValue, removeCartValue } = useStorage("cart-products");
    const { savedStorage, toggleSavedValue } = useStorage("saved-products");

    return (
        <StorageContext.Provider value={{ cartStorage, savedStorage, }} >
            <StorageDispatchContext.Provider value={{ addCartValue, removeCartValue, toggleSavedValue}}>
                {children} 
            </StorageDispatchContext.Provider>
        </StorageContext.Provider>
    );
};

export default StorageProvider;