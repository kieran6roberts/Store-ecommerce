import { ERRORS } from "@/hooks/useForm";

function formValidation<T>(inputs: T): T {
    const errors: T = {};
    const passwordExpPattern = /^(?=.*\d)()(?=.*[A-Z]).{8,24}$/u;

    console.log(inputs);
    return errors;
}

export default formValidation;