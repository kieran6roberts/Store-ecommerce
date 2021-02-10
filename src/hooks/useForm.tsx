import * as React from "react";

import isObjectEmpty from "@/utils/isObjectEmpty";

type InputType = HTMLInputElement | HTMLTextAreaElement;

interface IReviewInputs {
    headline: string;
    name: string;
    message: string;
    rating: number
}

interface IUseFormOutput {
    errors: {};
    handleInputChange: <T extends InputType>(event: React.ChangeEvent<T>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void; 
    inputValues: IReviewInputs;
}

interface IUseFormInput {
    initInputs: IReviewInputs;
    customSubmit: () => Promise<void>
}

const useForm = ({ initInputs, customSubmit }: IUseFormInput): IUseFormOutput => {
    const [ inputValues, setInputValues ] = React.useState<IReviewInputs>(initInputs);
    const [ errors, setErrors ] = React.useState({});

    const handleInputChange = <T extends InputType>(event: React.ChangeEvent<T>) => {
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