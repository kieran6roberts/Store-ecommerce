const isObjectEmpty = (obj: { [key: string]: any }) => Object.keys(obj).length === 0 && obj.constructor === Object;

export default isObjectEmpty;