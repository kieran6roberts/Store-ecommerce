import { Box, 
    Button,
    Center,
    Flex, 
    HStack, 
    IconButton, 
    Link, 
    List, 
    ListItem,
    Text } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import * as React from "react";
import { AiOutlineHeart, AiOutlineStar } from "react-icons/ai";

const Product = () => {
    return (
        <Flex
        flexDirection="column"
        alignItems="flex-end"
        h="380px"
        overflow="hidden"
        position="relative"
        shadow="base"
        w="300px"
        >
            <IconButton 
            aria-label="save item"
            bg="transparent"
            icon={<AiOutlineHeart />} />
            <Box 
            border="1px solid black"
            h="60%"
            mb={8}
            w="100%"
            >
                <Center>
                    Image
                </Center>
            </Box>
            <Box 
            bg="red.200"
            position="absolute"
            top="50%"
            left="0%"
            transform="skewY(20deg)"
            h="100%"
            w="100%"
            zIndex="-10"
            >

            </Box>
            <Flex 
            alignItems="center"
            justifyContent="space-between"
            mb={4}
            px={2}
            width="100%"
            >
                <Button size="sm">
                    Add to Cart 
                </Button>
                <Text 
                fontWeight="bold"
                >
                    Price: £19.99
                </Text>
            </Flex>
            <List>
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
        </Flex>
    );
};

export default Product;