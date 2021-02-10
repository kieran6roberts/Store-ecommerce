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
import { useGetUser } from "@/lib/user";

export interface IReviewInputs {
    headline: string;
    name: string;
    message: string;
    rating: number
}

interface IReview {
    mutationError: ApolloError | undefined;
    mutationLoading: boolean;
    submitHandler: (mutationVariable: IReviewInputs) => Promise<void>;
}

const Review: React.FC<IReview> = ({ submitHandler, 
    mutationLoading, 
    mutationError }) => {

    const { profile, loading } = useGetUser();

    console.log(profile);

    const initReviewInputs = {
        name: profile?.nickname ?? "Anonymous",
        headline: "",
        message: "",
        rating: 0
    };

    const { handleSubmit, 
            handleInputChange, 
            inputValues } = useForm(initReviewInputs, () => submitHandler(inputValues));

    console.log(inputValues);

    return (
        <VStack 
        fontSize="xs"
        spacing={2}
        >
            <form 
            onSubmit={() => submitHandler(inputValues)}
            style={{ width: "100%" }}
            >
                <FormControl mb={2}>
                    <Rating />
                    <FormLabel>
                        Review Headline
                    </FormLabel>
                    <Input 
                    isRequired 
                    name="headline"
                    onChange={(event) => handleInputChange(event)}
                    type="text"
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
                    isRequired 
                    name="message"
                    onChange={(event) => handleInputChange(event)}
                    value={inputValues.message}
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