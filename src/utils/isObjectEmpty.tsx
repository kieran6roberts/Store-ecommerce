import { ERRORS } from "@/hooks/useForm";

function isObjectEmpty(obj: ERRORS): boolean {
    return Object.keys(obj).length === 0 ? true : false;
}

export default isObjectEmpty;