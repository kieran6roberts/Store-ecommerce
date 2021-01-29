import * as React from "react";

import { IMouseEventOnHTMLElement } from "@/components/Products/Products";
import { getStorage, IProductStorage, setStorage } from "@/utils/storage";

type StorageContextType = {
    cartStorage: Array<IProductStorage> | null;
    savedStorage: Array<IProductStorage> | null;
    subTotal: number;
}

type StorageUpdateContextType = {
    toggleSavedValue: (key: string, value: IProductStorage) => void;
    addCartValue: (value: IProductStorage) => void;
    removeCartValue: (event: IMouseEventOnHTMLElement) => void;
    updatePriceValue: (products: Array<IProductStorage>) => void;
}

const StorageContext = React.createContext<StorageContextType | undefined>(undefined);
const StorageDispatchContext = React.createContext<StorageUpdateContextType | undefined>(undefined);

export const useStore = (): StorageContextType | undefined => React.useContext(StorageContext);
export const useStoreUpdate = (): StorageUpdateContextType | undefined => React.useContext(StorageDispatchContext);

const useStorage = (key: string) => {
    const CART_KEY = "cart-products";
    const SAVED_KEY = "saved-products";

    const [ cartStorage, setCartStorage ] = React.useState(getStorage(CART_KEY));
    const [ savedStorage, setSavedStorage ] = React.useState(getStorage(SAVED_KEY));
    const [ subTotal, setSubTotal ] = React.useState(() => {
        const products = getStorage(CART_KEY);

        if (products) {
            return products.map(product => product.price)
                    .reduce((accum, curValue) => accum + curValue);
        } else {
            return 0;
        }
    });

    const toggleSavedValue = (key: string, value: IProductStorage) => {
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

        setSavedStorage(stateItems ?? null);
    };

    const addCartValue = (value: IProductStorage) => {
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
        const items = getStorage(key)!;

        const productElementId = event.target.closest("li")?.id;

        const newStorage = items.filter(item => item.id !== productElementId);

        setStorage(key, newStorage);
        setCartStorage(newStorage);
    };

    const updatePriceValue = (products: Array<IProductStorage>) => {
        if (!products) {
            return;
        }

        const total = products.map(product => product.price)
                        ?.reduce((accum, curValue) => accum + curValue, 0);

        setSubTotal(total);
    };

    return {
        addCartValue,
        cartStorage,
        removeCartValue,
        savedStorage,
        subTotal,
        toggleSavedValue,
        updatePriceValue
    };
};

const StorageProvider = ({ children }: { children: React.ReactNode}): React.ReactElement  => {
    const { cartStorage, 
        addCartValue, 
        removeCartValue,
        subTotal, 
        updatePriceValue } = useStorage("cart-products");

    const { savedStorage, toggleSavedValue } = useStorage("saved-products");

    return (
        <StorageContext.Provider value={{ cartStorage, savedStorage, subTotal }} >
            <StorageDispatchContext.Provider value={{ addCartValue, 
                removeCartValue, 
                toggleSavedValue,
                updatePriceValue
                }}>
                {children} 
            </StorageDispatchContext.Provider>
        </StorageContext.Provider>
    );
};

export default StorageProvider;