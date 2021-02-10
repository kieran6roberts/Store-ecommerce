import * as React from "react";

import isObjectEmpty from "@/utils/isObjectEmpty";

const useForm = (initInputs: {}, customSubmit: () => void) => {
    const [ inputValues, setInputValues ] = React.useState(initInputs);
    const [ errors, setErrors ] = React.useState(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name: eventName, value: eventValue } = event.target;

        setInputValues({
            ...inputValues,
            [ eventName ]: eventValue
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //setErrors();
    };

    React.useEffect(() => {
        const isError = isObjectEmpty(errors);

        if (isError) {
            customSubmit();
        }
    }, [ errors ]);

    return {
        errors,
        handleInputChange,
        handleSubmit,
        inputValues
    };
};

export default useForm;