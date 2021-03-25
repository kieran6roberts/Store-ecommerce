import * as React from "react";

import { getStorage, IProductStorage, setStorage } from "@/utils/storage";

type StorageContextType = {
    cartStorage: Array<IProductStorage> | null;
    savedStorage: Array<IProductStorage> | null;
}

type StorageUpdateContextType = {
    toggleSavedValue: (key: string, value: IProductStorage) => void;
    addCartValue: (value: IProductStorage) => void;
    removeCartValue: (event: React.MouseEvent<HTMLButtonElement>) => void;
    setCartStorage: React.Dispatch<React.SetStateAction<IProductStorage[] | null>>;
    updateItemsQuantities: (cartQuantities: number[]) => void;
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

    const updateItemsQuantities = (quantities: number[]) => {
        const items = getStorage(key)!;
        let updatedItems: any = items;

        if (items) {
            updatedItems = items.flatMap((item, index) => {
                if (quantities[index] < 1) {
                    return [];
                }
                
                return { 
                    ...item, 
                    quantity: quantities[index] 
                };
            });

                setStorage(key, updatedItems);
        }

        setCartStorage(updatedItems);
    };

    const removeCartValue = (event: React.MouseEvent<HTMLButtonElement>) => {
        const items = getStorage(key)!;

        const productElementId = (event.target as HTMLElement).closest("li")?.id;

        const newStorage = items?.filter(item => item.id !== productElementId);

        setStorage(key, newStorage);
        setCartStorage(newStorage);
    };

    return {
        addCartValue,
        cartStorage,
        removeCartValue,
        savedStorage,
        setCartStorage,
        toggleSavedValue,
        updateItemsQuantities
    };
};

const StorageProvider = ({ children }: { children: React.ReactNode}): React.ReactElement  => {
    const { cartStorage, 
        addCartValue, 
        removeCartValue,
        updateItemsQuantities } = useStorage("cart-products");

    const { savedStorage, 
        toggleSavedValue, 
        setCartStorage } = useStorage("saved-products");

    return (
        <StorageContext.Provider value={{ cartStorage, savedStorage }} >
            <StorageDispatchContext.Provider value={{ addCartValue, 
                removeCartValue, 
                setCartStorage,
                toggleSavedValue,
                updateItemsQuantities
                }}>
                {children} 
            </StorageDispatchContext.Provider>
        </StorageContext.Provider>
    );
};

export default StorageProvider;