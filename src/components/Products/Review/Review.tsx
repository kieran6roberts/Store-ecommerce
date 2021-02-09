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

const Review = ({ submitHandler, 
    mutationLoading, 
    mutationError }): React.ReactElement => {
    return (
        <VStack 
        fontSize="xs"
        spacing={2}
        >
            <form 
            onSubmit={submitHandler}
            style={{ width: "100%" }}
            >
                <FormControl mb={2}>
                    <FormLabel>
                        Review Headline
                    </FormLabel>
                    <Input 
                    type="text"
                    isRequired 
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