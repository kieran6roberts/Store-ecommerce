
export interface IReviewErrors {
    errors?: string;
    headline?: string;
    message?: string;
}

export const reviewValidation = (inputs: { [key: string]: string }): IReviewErrors => {
    const errors: IReviewErrors = {};

    if (!inputs.headline.trim() || typeof inputs.headline !== "string") {
        errors.headline = "Valid headline is required!";
    } else if (inputs.headline.length < 5) {
        errors.headline = "Headline must be at least 5 characters!";
    }

    if (!inputs.message.trim() || typeof inputs.message !== "string") {
        errors.message = "Invalid input!";
    } else if (inputs.message.length < 5) {
        errors.message = "You can do better than that. Message should be at least 5 characters!";
    }

    return errors;
};
