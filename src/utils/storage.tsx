export interface ICartStorage {
    name: string;
    price: number;
    description: {
      text: string;
    }
}

export interface ISavedStorage {
    id: string
}

type storageTypes = ICartStorage | ISavedStorage;

export const setStorage = (key: string, value: unknown): void => {
        window.localStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = (key: string): storageTypes[] | null => {
    if (typeof window === "undefined") {
        return null;
    }
    
    const storedItems = window.localStorage.getItem(key);
    
    if (!storedItems) {
        return null;
    }

    return JSON.parse(storedItems);
};