import * as React from "react";

import { IReviewInputs } from "@/components/Products/Review/Review";
import { IAccountInput } from "@/pages/account";
import isObjectEmpty from "@/utils/isObjectEmpty";
import { IReviewErrors, reviewValidation } from "@/utils/validation/reviews";

type InputType = HTMLInputElement | HTMLTextAreaElement;
type SubmitProp = (mutationVariable: IReviewInputs) => Promise<void>;
type SubmissionCombinable = SubmitProp | (() => void);
type InputCombinable = IReviewInputs | IAccountInput;

interface IUseFormOutput {
    errors: IReviewErrors;
    handleInputChange: <T extends InputType>(event: React.ChangeEvent<T>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void; 
    inputValues: InputCombinable;
    setInputValues: React.Dispatch<React.SetStateAction<InputCombinable>>
}

const useForm = (initInputs: InputCombinable, customSubmit: SubmissionCombinable): IUseFormOutput => {
    const [ inputValues, setInputValues ] = React.useState<InputCombinable>(initInputs);
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
        setErrors(reviewValidation(inputValues));
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