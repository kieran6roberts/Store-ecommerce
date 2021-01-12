import * as React from "react";

import callUserApi from "@/utils/callUserApi";
import formValidation from "@/utils/formValidation";

export interface ERRORS {
    name?: string,
    email?: string,
    address?: string,
    password?: string,
    confirm?: string
}

function useForm({ initValues = {} }: ERRORS) {
    const [ inputValues, setInputValues ] = React.useState(initValues);
    const [ errors, setErrors ] = React.useState({});
    const [ loading, setLoading ] = React.useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors(formValidation(errors));
        setLoading(true);

        try {
            const promise = await callUserApi(errors);
            console.log(promise);
            setLoading(false);

        } catch(error) {
            setErrors("Invalid username or password!");
            setLoading(false);
            setInputValues(initValues);
        }

        console.log(inputValues);
        return null;
    };

    return {
        errors,
        handleSubmit,
        inputValues,
        loading
    };
}

export default useForm;