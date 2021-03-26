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
    product?: {
        id: string;
    }
    userPicture: string;
    __typename?: string;
}

interface IReview {
    mutationError: ApolloError | undefined;
    mutationLoading: boolean;
    productId: string;
    submitHandler: (mutationVariable: { [key:string]: string | number }) => void;
    user: string;
    userPicture: string;
}

const Review: React.FC<IReview> = ({ 
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
        h="380px"
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
                    mt={{base: "0.8rem", xl: "2rem"}}
                    >
                        Review Headline
                    </FormLabel>
                    <Input 
                    className="input-review"
                    isRequired 
                    name="headline"
                    onChange={(event) => handleInputChange(event)}
                    type="text"
                    value={inputValues.headline}
                    />
                    <FormHelperText 
                    color={errors.headline ? "red.500" : "pink.400"}
                    fontSize="xs"
                    >
                        {errors.headline ?? "title for your review"}
                    </FormHelperText>
                </FormControl>
                <FormControl mb={2}>
                    <FormLabel 
                    fontSize="sm"
                    mt={{base: "0.8rem", xl: "2rem"}}
                    >
                        Review content
                    </FormLabel>
                    <Textarea 
                    className="input-review"
                    isRequired 
                    name="message"
                    onChange={(event) => handleInputChange(event)}
                    value={inputValues.message}
                    />
                    <FormHelperText 
                    color={errors.message ? "red.500" : "pink.400"}
                    fontSize="xs"
                    >
                        {errors.message ?? "what would you like to say?"}
                    </FormHelperText>
                </FormControl>
                <Button 
                alignSelf="flex-end"
                bg="pink.400"
                fontSize="sm"
                color="white"
                isLoading={mutationLoading}
                py={[1, 1, 2, 3, 8]}
                px={[1, 1, 2, 6, 16]}
                type="submit"
                >
                    Sumbit Review
                </Button>
            </form>
        </VStack>
    );
};

export default Review;