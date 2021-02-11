import { IReviewInputs } from "@/components/Products/Review/Review";

export interface IReviewErrors {
    headline?: string;
    message?: string;
}

export const reviewValidation = (inputs: IReviewInputs): IReviewErrors => {
    const errors: IReviewErrors = {};

    if (!inputs.headline.trim() || typeof inputs.headline !== "string") {
        errors.headline = "Valid headline is required!";
    } else if (inputs.headline.length < 5) {
        errors.headline = "Headline must be at least 5 characters!";
    }

    if (typeof inputs.message !== "string") {
        errors.message = "Invalid input!";
    }

    return errors;
};
