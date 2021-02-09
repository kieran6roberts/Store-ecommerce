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

const Review = (): React.ReactElement => {
    return (
        <VStack 
        fontSize="xs"
        spacing={2}
        >
            <FormControl>
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
            <FormControl>
                <FormLabel>
                    Review content
                </FormLabel>
                <Textarea 
                isRequired 
                />
            </FormControl>
            <Button 
            colorScheme="blue"
            >
                Sumbit Review
            </Button>
        </VStack>
    );
};

export default Review;