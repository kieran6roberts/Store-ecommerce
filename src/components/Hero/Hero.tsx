import { Box,
    Center,    
    Heading, 
    Link, 
    List, 
    ListItem } from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";

const Hero = (): React.ReactElement => {
 return (
    <Box>
        <Center 
        as="article"
        display="flex"
        flexDirection="column"
        h="45vh"
        >
   
        <Heading 
        as="h1"
        fontWeight="400"
        mx="auto"
        mb={8}
        textAlign="center"
        textTransform="uppercase"
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
                border="2px solid pink"
                borderRadius="md"
                fontWeight="700"
                py={1}
                px={2}
                textTransform="uppercase"
                w="10rem"
                >
                    <NextLink 
                    href="/store"
                    passHref
                    >
                        <Link>
                            Coffee Beans
                        </Link>
                    </NextLink>
                </ListItem>
                <ListItem
                border="2px solid pink"
                borderRadius="md"
                fontWeight="700"
                py={1}
                px={2}
                textTransform="uppercase"
                w="10rem"
                >
                    <NextLink 
                    href="/store"
                    passHref
                    >
                        <Link>
                            Ground Coffee
                        </Link>
                    </NextLink>
                </ListItem>
                <ListItem
                border="2px solid pink"
                borderRadius="md"
                fontWeight="700"
                py={1}
                px={2}
                textTransform="uppercase"
                w="10rem"
                >
                    <NextLink 
                    href="/store"
                    passHref
                    >
                        <Link>
                            Mugs & Cups
                        </Link>
                    </NextLink>
                </ListItem>
            </List>
            <NextLink 
            href="/store"
            passHref
            >
                <Link
                border="4px solid pink"
                borderRadius="md"
                fontWeight="700"
                py={2}
                px={4}
                textAlign="center"
                textTransform="uppercase"
                w="12rem">
                    Shop All Items
                </Link>
            </NextLink>
        </Center>
    </Box>
 );
};

export default Hero;