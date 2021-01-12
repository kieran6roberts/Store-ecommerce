import { Alert, 
    AlertDescription,
    AlertIcon, 
    AlertTitle } from "@chakra-ui/react";
import * as React from "react";

interface ERROR {
    title: string,
    description: string
}

function Error({ title, description }: ERROR): React.ReactElement {
    return (
        <Alert 
        borderRadius={2}
        mb={4}
        status="error" 
        >
            <AlertIcon />
            <AlertTitle>
                {title}
            </AlertTitle>
            <AlertDescription>
                {description}
            </AlertDescription>
        </Alert>
    );
}

export default Error;