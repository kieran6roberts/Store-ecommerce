export interface IProductStorage {
    category: string;
    description: string;
    id: string;
    image: string;
    name: string;
    price: number;
    quantity: number;
}

export const setStorage = (key: string, value: Array<IProductStorage>): void => {
        window.localStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = (key: string): Array<IProductStorage> | null => {

    if (typeof window === "undefined") {
        return null;
    }
    
    const storedItems = window.localStorage.getItem(key);

    return storedItems ? JSON.parse(storedItems) : [];
};