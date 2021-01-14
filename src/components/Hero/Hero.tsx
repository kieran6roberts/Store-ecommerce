import { Box,
    Center, 
    Flex,    
    Heading, 
    Link, 
    List, 
    ListItem } from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";

const Hero = () => {
 return (
    <Box>
        <Center 
        display="flex"
        flexDirection="column"
        h="45vh"
        >
        <Heading 
        as="h2"
        textAlign="center"
        mx="auto"
        w="75vw"
        >
        Bringing you the best coffee from all over the world
        </Heading>
            <List 
            textAlign="center"
            mt={["2", "4", "6", "8"]}
            w="75vw"
            >
                <Flex
                alignItems="center"
                flexDirection={["column", "column", "row"]}
                justifyContent="space-evenly"
                >
                    <ListItem 
                    border="2px solid black"
                    py={1}
                    px={2}
                    >
                        <NextLink href="/">
                            <Link>
                                Coffee Beans
                            </Link>
                        </NextLink>
                    </ListItem>
                    <ListItem
                    border="2px solid black"
                    py={1}
                    px={2}
                    >
                        <NextLink href="/">
                            <Link>
                                Ground Coffee
                            </Link>
                        </NextLink>
                    </ListItem>
                    <ListItem
                    border="2px solid black"
                    py={1}
                    px={2}
                    >
                        <NextLink href="/">
                            <Link>
                                Mugs & Cups
                            </Link>
                        </NextLink>
                    </ListItem>
                </Flex>
            </List>
    </Center>

    </Box>
 );
};

export default Hero;