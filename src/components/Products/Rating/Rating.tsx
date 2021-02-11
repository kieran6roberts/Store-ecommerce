import { 
    HStack, 
    IconButton,
    List, 
    ListItem,
    Text } from "@chakra-ui/react";
import * as React from "react";
import { AiOutlineStar } from "react-icons/ai";

const Rating = ({ updateRating }: { updateRating: () => void }): React.ReactElement => {

    const handleRatingUI = (element: HTMLElement) => {
        const activeColor = "orange";

        if (!(element instanceof HTMLElement)) {
            return;
        }

        element.style.color = activeColor;
        element.setAttribute("data-rating", "true");
    };

    const handleUpdateRating = (event: React.MouseEvent<HTMLButtonElement>) => {
        const ratingBtns = Array.from(document.querySelectorAll(".rating-btn")) as HTMLElement[];

        ratingBtns.forEach((btn) => {
            btn.style.color = "black";
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
        <List aria-label="product-rating">
            <HStack 
            display="flex"
            spacing={1}>
                <Text display="inline-block">
                    Product Rating: 
                </Text>
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
    );
};

export default Rating;