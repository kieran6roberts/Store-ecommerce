import { 
    Box,
    Flex,
    Heading,
    IconButton,
    Image,
    List,
    ListItem,
    Text,
    useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { AiOutlineStar } from "react-icons/ai";

import { IReviewInputs } from "@/components/Products/Review/Review";
import { generateItemKey } from "@/utils/generateItemKey";


const UserReview = ({ reviews }: { reviews: IReviewInputs[] }): React.ReactElement => {

    const mapReviews = () => reviews.map(review => (
        <Box 
            as="li"
            bg={useColorModeValue("gray.50", "gray.700")}
            borderRadius="md"
            key={generateItemKey(review.headline)}
            mb={4}
            p={4}
            >
                <Flex 
                align="center"
                justify="flex-start"
                mb={4}
                >
                    {review?.userPicture ?
                    <Box mr={4}>
                        <Image 
                        alt="user profile pic"
                        boxSize={["20px", "20px", "20px", "30px"]}
                        src={review.userPicture}
                        /> 
                    </Box> : null}
                    <Heading 
                    as="h4"
                    fontSize="xs"
                    fontWeight="400"
                    >
                        {review.name}
                    </Heading>
                </Flex>
                <Heading 
                as="h5"
                fontSize="md"
                mb={4}
                >
                    {review.headline}
                </Heading>
                <List
                as="ul" 
                display="flex"
                mb={4}
                >
                    <ListItem 
                    mx={1}>
                        <IconButton 
                        aria-label="rate product"
                        bg={parseInt(review.rating) >= 1 ? "orange.300" : "transparent"}
                        icon={<AiOutlineStar />} 
                        isRound={true}
                        pointerEvents="none"
                        size="xs"
                        variant="ghost"
                        />
                    </ListItem>
                    <ListItem mx={1}>
                        <IconButton 
                        aria-label="rate product"
                        bg={parseInt(review.rating) >= 2 ? "orange.300" : "transparent"}
                        icon={<AiOutlineStar />} 
                        isRound={true}
                        pointerEvents="none"
                        size="xs"
                        variant="ghost"
                        />
                    </ListItem>
                    <ListItem mx={1}>
                        <IconButton
                        aria-label="rate product"
                        bg={parseInt(review.rating) >= 3 ? "orange.300" : "transparent"}
                        icon={<AiOutlineStar />} 
                        isRound={true}
                        pointerEvents="none"
                        size="xs"
                        variant="ghost"
                        />
                    </ListItem>
                    <ListItem mx={1}>
                        <IconButton 
                        aria-label="rate product"
                        bg={parseInt(review.rating) >= 4 ? "orange.300" : "transparent"}
                        icon={<AiOutlineStar />} 
                        isRound={true}
                        pointerEvents="none"
                        size="xs"
                        variant="ghost"
                        />
                    </ListItem>
                    <ListItem mx={1}>
                        <IconButton 
                        aria-label="rate product"
                        bg={parseInt(review.rating) >= 5 ? "orange.300" : "transparent"}
                        icon={<AiOutlineStar />} 
                        isRound={true}
                        pointerEvents="none"
                        size="xs"
                        variant="ghost"
                        />
                    </ListItem>
                </List>
                <Text 
                bg={useColorModeValue("white", "gray.800")}
                h="full"
                p={2}
                >
                    {review.message}
                </Text>
            </Box>
    ));

    return (
        <>
            {mapReviews()}
        </>
    );

};

export default UserReview;
