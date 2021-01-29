const generateItemKey = <T, >(item: T): string => `${item}_${ new Date().getTime() }`;

export { generateItemKey };