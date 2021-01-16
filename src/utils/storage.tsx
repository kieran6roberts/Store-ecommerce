export const setStorage = (key: string, value: string) => {
    try {
        window.localStorage.setItem(key, value);
    } catch (error) {
        console.error(error);
    }
};

export const getStorage = (key: string) => {
    try {
        return window.localStorage.getItem(key);
    } catch (error) {
        console.error(error);
        return null;
    }
};