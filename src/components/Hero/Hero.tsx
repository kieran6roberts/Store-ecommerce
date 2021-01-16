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
        mb={8}
        w="90vw"
        >
        Bringing you the best coffee from all over the world
        </Heading>
            <List 
            alignItems="center"
            display={["none", "none", "flex"]}
            flexDirection="row"
            justifyContent="space-evenly"
            textAlign="center"
            my={8}
            w="75vw"
            >
                <ListItem 
                border="2px solid black"
                py={1}
                px={2}
                w="10rem"
                >
                    <NextLink href="/store">
                        <Link>
                            Coffee Beans
                        </Link>
                    </NextLink>
                </ListItem>
                <ListItem
                border="2px solid black"
                py={1}
                px={2}
                w="10rem"
                >
                    <NextLink href="/store">
                        <Link>
                            Ground Coffee
                        </Link>
                    </NextLink>
                </ListItem>
                <ListItem
                border="2px solid black"
                py={1}
                px={2}
                w="10rem"
                >
                    <NextLink href="/store">
                        <Link>
                            Mugs & Cups
                        </Link>
                    </NextLink>
                </ListItem>
            </List>
            <NextLink href="/store">
                <Link
                border="2px solid black"
                py={2}
                px={4}
                textAlign="center"
                w="12rem">
                    Shop All Items
                </Link>
            </NextLink>
        </Center>
    </Box>
 );
};

export default Hero;