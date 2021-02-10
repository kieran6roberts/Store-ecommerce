const isObjectEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;

export default isObjectEmpty;