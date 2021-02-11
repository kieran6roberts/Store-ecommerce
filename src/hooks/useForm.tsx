import * as React from "react";

import { IReviewInputs } from "@/components/Products/Review/Review";
import isObjectEmpty from "@/utils/isObjectEmpty";
import { IReviewErrors, reviewValidation } from "@/utils/validation/reviews";

type InputType = HTMLInputElement | HTMLTextAreaElement;

type SubmitProp = (mutationVariable: IReviewInputs) => Promise<void>;

interface IUseFormOutput {
    errors: IReviewErrors;
    handleInputChange: <T extends InputType>(event: React.ChangeEvent<T>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void; 
    inputValues: IReviewInputs;
    setInputValues: React.Dispatch<React.SetStateAction<IReviewInputs>>
}

const useForm = (initInputs: IReviewInputs, customSubmit: SubmitProp): IUseFormOutput => {
    const [ inputValues, setInputValues ] = React.useState<IReviewInputs>(initInputs);
    const [ errors, setErrors ] = React.useState({ errors: "" });
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
        setErrors(reviewValidation(inputValues));
    };

    React.useEffect(() => {
        console.log(errors);
        const isError = isObjectEmpty(errors);

        if (isError && !submitDisabled) {
            customSubmit(inputValues);
            //console.log(customSubmit)
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