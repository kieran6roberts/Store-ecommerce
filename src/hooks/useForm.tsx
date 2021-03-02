import * as React from "react";

import { ICheckoutInputs } from "@/components/Forms/CheckoutForm/CheckoutForm";
import { IReviewInputs } from "@/components/Products/Review/Review";
import { IAccountInput } from "@/pages/account";
import isObjectEmpty from "@/utils/isObjectEmpty";
import { IReviewErrors, reviewValidation } from "@/utils/validation/reviews";

type InputType = HTMLInputElement | HTMLTextAreaElement;
type SubmitProp = (values: {[key: string]: string}) => Promise<unknown>;

interface IUseFormOutput {
    errors: IReviewErrors;
    handleInputChange: <T extends InputType>(event: React.ChangeEvent<T>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void; 
    inputValues: {[key: string]: string};
    setInputValues: React.Dispatch<React.SetStateAction<any>>
}

const useForm = (initInputs: { [key: string]: string }, 
    customSubmit: SubmitProp,
    customValidation: any
    ): IUseFormOutput => {
    const [ inputValues, setInputValues ] = React.useState(initInputs);
    const [ errors, setErrors ] = React.useState<IReviewErrors>({ errors: "" });
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
        setErrors(customValidation(inputValues));
    };

    React.useEffect(() => {
        const isError = isObjectEmpty(errors);

        if (isError && !submitDisabled) {
            customSubmit(inputValues);
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