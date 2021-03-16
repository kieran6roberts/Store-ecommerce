import { ApolloError } from "@apollo/client";
import { Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Textarea,
    VStack
} from "@chakra-ui/react";
import * as React from "react";

import Rating from "@/components/Products/Rating/Rating";
import useForm from "@/hooks/useForm";
import { reviewValidation } from "@/utils/validation/reviews";

export interface IReviewInputs {
    createdAt?: string;
    headline: string;
    name: string;
    message: string;
    rating: string;
    product: {
        id: string;
    }
    userPicture: string;
    __typename?: string;
}

interface IReview {
    mutationError: ApolloError | undefined;
    mutationLoading: boolean;
    productId: string;
    submitHandler: (mutationVariable: IReviewInputs) => void;
    user: string;
    userPicture: string;
}

const Review: React.FC<IReview> = ({ 
    mutationError,
    mutationLoading, 
    productId,
    submitHandler,
    user,
    userPicture }) => {

    const initReviewInputs = {
        name: user ?? "Guest",
        headline: "",
        message: "",
        rating: 0,
        id: productId,
        userPicture: userPicture ?? ""
    };

    const { errors,
            handleSubmit, 
            handleInputChange, 
            inputValues,
            setInputValues } = useForm(initReviewInputs, submitHandler, reviewValidation);

    const handleUpdateRating = () => {
        const rating = document.querySelectorAll("[data-rating='true']").length;

        setInputValues({
            ...inputValues,
            id: productId,
            rating,
        });
    };

    return (
        <VStack 
        fontSize="xs"
        spacing={2}
        >
            <form 
            onSubmit={(event) => handleSubmit(event)}
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
                <FormControl mb={2}>
                    <Rating updateRating={handleUpdateRating} />
                    <FormLabel 
                    fontSize="sm"
                    mt={4}
                    >
                        Review Headline
                    </FormLabel>
                    <Input 
                    isRequired 
                    name="headline"
                    onChange={(event) => handleInputChange(event)}
                    type="text"
                    value={inputValues.headline}
                    />
                    <FormHelperText 
                    color={errors.headline ? "red.500" : "none"}
                    fontSize="xs"
                    >
                        {errors.headline ?? "title for your review"}
                    </FormHelperText>
                </FormControl>
                <FormControl mb={2}>
                    <FormLabel fontSize="sm">
                        Review content
                    </FormLabel>
                    <Textarea 
                    isRequired 
                    name="message"
                    onChange={(event) => handleInputChange(event)}
                    value={inputValues.message}
                    />
                    <FormHelperText 
                    color={errors.message ? "red.500" : "none"}
                    fontSize="xs"
                    >
                        {errors.message ?? "what would you like to say?"}
                    </FormHelperText>
                </FormControl>
                <Button 
                colorScheme="pink"
                id="review-submit"
                alignSelf="flex-end"
                type="submit"
                isLoading={mutationLoading}
                >
                    Sumbit Review
                </Button>
            </form>
        </VStack>
    );
};

export default Review;