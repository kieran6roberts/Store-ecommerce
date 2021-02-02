import { HStack, IconButton,List, ListItem } from "@chakra-ui/react";
import * as React from "react";
import { AiOutlineStar } from "react-icons/ai";

const Rating = (): React.ReactElement => {
    return (
        <List aria-label="product-rating">
            <HStack 
            display="flex"
            spacing={1}>
                <ListItem>
                    <IconButton 
                    aria-label="rate product"
                    isRound={true}
                    size="xs"
                    icon={<AiOutlineStar />} 
                    variant="ghost"
                    />
                </ListItem>
                <ListItem>
                    <IconButton 
                    aria-label="rate product"
                    isRound={true}
                    size="xs"
                    icon={<AiOutlineStar />} 
                    variant="ghost"
                    />
                </ListItem>
                <ListItem>
                    <IconButton 
                    aria-label="rate product"
                    isRound={true}
                    size="xs"
                    icon={<AiOutlineStar />} 
                    variant="ghost"
                    />
                </ListItem>
                <ListItem>
                    <IconButton 
                    aria-label="rate product"
                    isRound={true}
                    size="xs"
                    icon={<AiOutlineStar />} 
                    variant="ghost"
                    />
                </ListItem>
                <ListItem>
                    <IconButton 
                    aria-label="rate product"
                    isRound={true}
                    size="xs"
                    icon={<AiOutlineStar />} 
                    variant="ghost"
                    />
                </ListItem>
            </HStack>
        </List>
    );
};

export default Rating;