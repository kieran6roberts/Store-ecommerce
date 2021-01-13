import * as React from "react";

import callUserApi from "@/utils/callUserApi";
import formValidation from "@/utils/formValidation";

export interface INPUTS {
    name?: string,
    email?: string,
    addressLine1?: string,
    addressLine2?: string,
    state?: string,
    postcode?: string,
    password?: string,
    confirm?: string
}

interface USE_FORM_RETURN {
    errors: INPUTS;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    inputValues: INPUTS;
    loading: boolean;
    
}

function useForm({ initValues }: { initValues: INPUTS }): USE_FORM_RETURN {
    const [ inputValues, setInputValues ] = React.useState(initValues);
    const [ errors, setErrors ] = React.useState({});
    const [ loading, setLoading ] = React.useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues({
            ...inputValues,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors(formValidation(inputValues));
        setLoading(true);
    };

    React.useEffect(() => {
        const handleFetch = async () => {
            try {
                await callUserApi(errors);
            } catch(error) {
                console.log(error);
            }
            setLoading(false);
        };

        handleFetch();
        
    }, [ errors ]);

    return {
        errors,
        handleSubmit,
        handleInputChange,
        inputValues,
        loading
    };
}

export default useForm;