import { ApolloError } from "@apollo/client";
import { Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    Textarea,
    VStack
} from "@chakra-ui/react";
import * as React from "react";

import Rating from "@/components/Products/Rating/Rating";
import useForm from "@/hooks/useForm";

interface IReview {
    mutationError: ApolloError | undefined;
    mutationLoading: boolean;
    submitHandler: () => Promise<void>;
}

const Review: React.FC<IReview> = ({ submitHandler, 
    mutationLoading, 
    mutationError }) => {

    const initReviewInputs = {
        name: "",
        headline: "",
        message: "",
        rating: 0
    };

    const { handleSubmit, 
            handleInputChange, 
            inputValues } = useForm(initReviewInputs, submitHandler);

    return (
        <VStack 
        fontSize="xs"
        spacing={2}
        >
            <form 
            onSubmit={(event) => handleSubmit(event)}
            style={{ width: "100%" }}
            >
                <FormControl mb={2}>
                    <Rating />
                    <FormLabel>
                        Review Headline
                    </FormLabel>
                    <Input 
                    onChange={(event) => handleInputChange(event)}
                    type="text"
                    isRequired 
                    value={inputValues.headline}
                    />
                    <FormHelperText>
                        Maximum 30 characters
                    </FormHelperText>
                </FormControl>
                <FormControl mb={2}>
                    <FormLabel>
                        Review content
                    </FormLabel>
                    <Textarea 
                    onChange={(event) => handleInputChange(event)}
                    value={inputValues.message}
                    isRequired 
                    />
                </FormControl>
                <Button 
                colorScheme="blue"
                id="review-submit"
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