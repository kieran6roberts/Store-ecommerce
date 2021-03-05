import { Box,
    Center,    
    Heading, 
    Link, 
    List, 
    ListItem, 
    SimpleGrid,
    Text,
    useColorModeValue } from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import * as React from "react";

const Hero = (): React.ReactElement => {
 return (
    <Box 
    as="header" 
    position="relative"
    >
        <Center 
        as="article"
        display="flex"
        flexDirection="column"
        h="55vh"
        >
        <SimpleGrid 
        bottom="0"
        columns={3}
        left="0"
        position="absolute"
        right="0"
        spacing={8}
        top="0"
        zIndex="-10"
        >
            <Box bg={useColorModeValue("white", "gray.800")} />
            <Box bg={useColorModeValue("white", "gray.800")} />
            <Box bg={useColorModeValue("white", "gray.800")} />
            <Box 
            bg={useColorModeValue("pink.50", "gray.700")}
            position="relative"
            opacity="0.3"
            >
                <NextImage
                alt=""
                src="/coffee-product-8.webp"
                layout="fill"
                objectFit="cover"
                objectPosition="bottom"
                />
            </Box>
            <Box bg={useColorModeValue("white", "gray.800")} />
            <Box 
            bg={useColorModeValue("pink.50", "gray.700")} 
            position="relative"
            opacity="0.3"
            >
                <NextImage
                alt=""
                src="/coffee-product-4.webp"
                layout="fill"
                objectFit="cover"
                />
            </Box>
        </SimpleGrid>
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
                bg={useColorModeValue("white", "gray.600")}
                fontWeight="700"
                py={1}
                px={2}
                textTransform="uppercase"
                w="10rem"
                >
                    Coffee Beans
                </ListItem>
                <ListItem
                bg={useColorModeValue("white", "gray.600")}
                fontWeight="700"
                py={1}
                px={2}
                textTransform="uppercase"
                w="10rem"
                >
                    Ground Coffee
                </ListItem>
                <ListItem
                bg={useColorModeValue("white", "gray.600")}
                fontWeight="700"
                py={1}
                px={2}
                textTransform="uppercase"
                w="10rem"
                >
                    Mugs & Cups
                </ListItem>
            </List>
            <NextLink 
            href="/store"
            passHref
            >
                <Link
                bg="pink.400"
                color="white"
                borderRadius="md"
                fontWeight="700"
                py={3}
                px={6}
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