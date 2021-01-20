export const setStorage = (key: string, value: unknown): void => {
        window.localStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = (key: string): unknown[] | null => {
    if (typeof window === "undefined") {
        console.log("returning because of running on server");
        return null;
    }
    
    const storedItems = window.localStorage.getItem(key);
    
    if (!storedItems) {
        return null;
    }

    return JSON.parse(storedItems);
};