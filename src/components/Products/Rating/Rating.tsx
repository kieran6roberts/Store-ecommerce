import { HStack, IconButton,List, ListItem } from "@chakra-ui/react";
import * as React from "react";
import { AiOutlineStar } from "react-icons/ai";

const Rating = (): React.ReactElement => {

    const handleUpdateRating = (event) => {
        const ratingBtns = Array.from(document.querySelectorAll(".rating-btn"));
        console.log(ratingBtns);
        console.log(event.currentTarget);
        ratingBtns.forEach(btn => {
            if (btn === event.currentTarget) {
                console.log("matching btn");
            }
        });

        const activeColor = "deepskyblue";
        if (event.currentTarget.style.backgroundColor === activeColor) {
            event.currentTarget.style.backgroundColor = "white";
        } else {
            event.currentTarget.style.backgroundColor = activeColor;
        }
    };

    return (
        <List aria-label="product-rating">
            <HStack 
            display="flex"
            spacing={1}>
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