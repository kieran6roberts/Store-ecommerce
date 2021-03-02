import { 
    Spinner, 
    Text, 
    useColorModeValue, 
    VStack } from "@chakra-ui/react";
import * as React from "react";

const LoadingSpinner: React.FC = () => (
    <VStack 
    bg={useColorModeValue("gray.100", "gray.700")}
    borderRadius="md"
    my={4}
    mx="auto"
    p={6}
    w="20rem"
    >
        <Spinner 
        color={useColorModeValue("blue.300", "pink.300")} 
        emptyColor={useColorModeValue("gray.100", "gray.600")}
        size="md"
        speed="0.6s"
        thickness="4px"
        />
        <Text textAlign="center">
            One moment
        </Text>
    </VStack>
);

export default LoadingSpinner;