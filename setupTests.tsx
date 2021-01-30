import "@testing-library/jest-dom";

beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
        value: {
            getItem: () => jest.fn(() => null),
            setItem: () => jest.fn(() => null)
        },
        writable: true
    });
});