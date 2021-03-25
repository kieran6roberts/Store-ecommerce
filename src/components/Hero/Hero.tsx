import { Box,
    Center,    
    Heading, 
    Link, 
    List, 
    ListItem, 
    SimpleGrid,
    useColorMode,    
    useColorModeValue } from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import * as React from "react";

const Hero = (): React.ReactElement => {
    
    const { colorMode } = useColorMode();

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
            top="0"
            zIndex="-10"
            >
                <Box bg={useColorModeValue("white", "gray.800")} />
                <Box bg={useColorModeValue("white", "gray.800")} />
                <Box bg={useColorModeValue("white", "gray.800")} />
                <Box 
                bg={useColorModeValue("pink.50", "gray.700")}
                position="relative"
                opacity="0.2"
                >
                    <NextImage
                    alt={colorMode === "light" ? "coffee shop coffee in a white mug on white background" : "Black bags of coffee beans sitting on shelf"}
                    src={colorMode === "light" ? "/coffee-product-8.webp" : "/coffee-product-14.webp"}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="bottom"
                    />
                </Box>
                <Box bg={useColorModeValue("white", "gray.800")} />
                <Box 
                bg={useColorModeValue("pink.50", "gray.700")} 
                position="relative"
                opacity="0.2"
                >
                    <NextImage
                    alt={colorMode === "light" ? "white bag of coffee beans against a white background" : "coffee shop coffee on brown table in a dark room"}
                    src={colorMode === "light" ? "/coffee-product-4.webp" : "/coffee-home.webp"}
                    layout="fill"
                    objectFit="cover"
                    />
                </Box>
            </SimpleGrid>
            <Heading 
            as="h1"
            fontWeight="500"
            fontSize="lg"
            mx="auto"
            mb={{base: 8, xl: 24}}
            textAlign="center"
            textTransform="uppercase"
            w="90vw"
            >
            Bringing you the best coffee from all over the world
            </Heading>
                <List 
                alignItems="center"
                display={["none", "none", "flex"]}
                fontSize="sm"
                flexDirection="row"
                justifyContent="space-evenly"
                textAlign="center"
                my={{base: 8, xl: 16}}
                w="75vw"
                >
                    <ListItem
                    bg={useColorModeValue("gray.50", "gray.500")}
                    borderRadius="sm"
                    fontWeight="700"
                    py={{base: 1, xl: 4}}
                    px={{base: 2, xl: 4}}
                    textTransform="uppercase"
                    w={{base: "10rem", xl: "18rem"}}
                    >
                        Coffee Beans
                    </ListItem>
                    <ListItem
                    bg={useColorModeValue("gray.50", "gray.500")}
                    borderRadius="sm"
                    fontWeight="700"
                    py={{base: 1, xl: 4}}
                    px={{base: 2, xl: 4}}
                    textTransform="uppercase"
                    w={{base: "10rem", xl: "18rem"}}
                    >
                        Ground Coffee
                    </ListItem>
                    <ListItem
                    bg={useColorModeValue("gray.50", "gray.500")}
                    borderRadius="sm"
                    fontWeight="700"
                    py={{base: 1, xl: 4}}
                    px={{base: 2, xl: 4}}
                    textTransform="uppercase"
                    w={{base: "10rem", xl: "18rem"}}
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
                    fontSize="md"
                    py={3}
                    px={6}
                    textAlign="center"
                    textTransform="uppercase"
                    w={{base: "12rem", xl: "20rem"}}
                    _hover={{
                        bg: "pink.500"
                    }}
                    >
                        Shop All Items
                    </Link>
                </NextLink>
            </Center>
        </Box>
    );
};

export default Hero;