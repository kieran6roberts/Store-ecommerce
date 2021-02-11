import * as React from "react";

import { IReviewInputs } from "@/components/Products/Review/Review";
import isObjectEmpty from "@/utils/isObjectEmpty";

type InputType = HTMLInputElement | HTMLTextAreaElement;

type SubmitProp = (mutationVariable: IReviewInputs) => Promise<void>;

interface IUseFormOutput {
    errors: {};
    handleInputChange: <T extends InputType>(event: React.ChangeEvent<T>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void; 
    inputValues: IReviewInputs;
}

const useForm = (initInputs: IReviewInputs, customSubmit: SubmitProp): IUseFormOutput => {
    const [ inputValues, setInputValues ] = React.useState<IReviewInputs>(initInputs);
    const [ errors, setErrors ] = React.useState({});
    const [ submitDisabled, setSubmitDisabled ] = React.useState(true);

    const handleInputChange = <T extends InputType>(event: React.ChangeEvent<T>) => {
        const { name: eventName, value: eventValue } = event.target;

        setInputValues({
            ...inputValues,
            [ eventName ]: eventValue
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //customSubmit(inputValues);
        //setErrors();
    };

    React.useEffect(() => {
        const isError = isObjectEmpty(errors);

        if (isError && !submitDisabled) {
            //console.log(customSubmit(inputValues));
            //customSubmit(inputValues);
        }

        setSubmitDisabled(false);

    }, [ errors ]);

    return {
        errors,
        handleInputChange,
        handleSubmit,
        inputValues,
        setInputValues
    };
};

export default useForm;