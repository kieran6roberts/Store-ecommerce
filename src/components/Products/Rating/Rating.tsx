import { 
    Heading,
    HStack, 
    IconButton,
    List, 
    ListItem,
    useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { AiOutlineStar } from "react-icons/ai";

const Rating = ({ updateRating }: { updateRating: () => void }): React.ReactElement => {

    const handleRatingUI = (element: HTMLElement) => {
        const activeColor = "orange";

        element.style.backgroundColor = activeColor;
        element.setAttribute("data-rating", "true");
    };

    const handleUpdateRating = (event: React.MouseEvent<HTMLButtonElement>) => {
        const ratingBtns = Array.from(document.querySelectorAll(".rating-btn")) as HTMLElement[];

        ratingBtns.forEach((btn) => {
            btn.style.backgroundColor = "transparent";
            btn.setAttribute("data-rating", "false");
        });

        ratingBtns.forEach((btn, index) => {
            if (btn === event.currentTarget) {
                for (let i = index; i >= 0; i--) {
                    handleRatingUI(ratingBtns[i]);
                }
            }
        });

        updateRating();
    };

    return (
        <>
        <Heading 
        as="h3" 
        fontSize="sm"
        fontWeight="500"
        mt={{base: "0.8rem", xl: "2rem"}}
        mb={2}
        w="full"
        >
            Product Rating 
        </Heading>
        <List 
        aria-label="product-rating"
        bg={useColorModeValue("gray.50", "gray.700")}
        borderRadius="md"
        p={1}
        w="max-content"
        >
            <HStack spacing={1}>
                <ListItem>
                    <IconButton 
                    aria-label="rate product"
                    className="rating-btn"
                    icon={<AiOutlineStar />} 
                    isRound={true}
                    onClick={(event) => handleUpdateRating(event)}
                    size="xs"
                    variant="ghost"
                    />
                </ListItem>
                <ListItem>
                    <IconButton 
                    aria-label="rate product"
                    className="rating-btn"
                    icon={<AiOutlineStar />} 
                    isRound={true}
                    onClick={(event) => handleUpdateRating(event)}
                    size="xs"
                    variant="ghost"
                    />
                </ListItem>
                <ListItem>
                    <IconButton
                    aria-label="rate product"
                    className="rating-btn" 
                    icon={<AiOutlineStar />} 
                    isRound={true}
                    onClick={(event) => handleUpdateRating(event)}
                    size="xs"
                    variant="ghost"
                    />
                </ListItem>
                <ListItem>
                    <IconButton 
                    aria-label="rate product"
                    className="rating-btn"
                    icon={<AiOutlineStar />} 
                    isRound={true}
                    onClick={(event) => handleUpdateRating(event)}
                    size="xs"
                    variant="ghost"
                    />
                </ListItem>
                <ListItem>
                    <IconButton 
                    aria-label="rate product"
                    className="rating-btn"
                    icon={<AiOutlineStar />} 
                    isRound={true}
                    onClick={(event) => handleUpdateRating(event)}
                    size="xs"
                    variant="ghost"
                    />
                </ListItem>
            </HStack>
        </List>
        </>
    );
};

export default Rating;