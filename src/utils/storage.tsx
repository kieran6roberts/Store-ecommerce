export const setStorage = (key: string, value: unknown): void => {
        window.localStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = (key: string): unknown[] | null => {
    if (typeof window === "undefined") {
        return null;
    }
    
    const storedItems = window.localStorage.getItem(key);
    
    if (!storedItems) {
        return null;
    }

    return JSON.parse(storedItems);
};