import { Box, 
    Button,
    Center,
    Flex, 
    IconButton, 
    Link, 
    Text } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import * as React from "react";
import { AiOutlineHeart } from "react-icons/ai";

import Rating from "@/components/Products/Rating/Rating";
import { getStorage, setStorage } from "@/utils/storage";

export interface IProduct {
    id?: string;
    image: string[];
    name: string;
    price: number;
    __typename?: string;
}

const Product: React.FC<IProduct> = ({ image = "/img.webp", name, price }) => {
    const getProductID = () => {
        console.log("save");
    };

    return (
        <Flex
        flexDirection="column"
        alignItems="flex-end"
        fontSize="sm"
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

            <NextLink href={`/store/products/${name.split(" ").join("-")}`}>
                <Link 
                height="60%"
                mb={2}
                w="100%"
                >
                    <Box 
                    border="1px solid black"
                    h="100%"
                    mb={4}
                    w="100%"
                    >   
                        <Image
                        alt="product image"
                        src={image}
                        layout="fill"
                        objectFit="cover"
                        />
                    </Box>
                </Link>
            </NextLink>
            <Box 
            borderTop="1px solid gray"
            position="absolute"
            top="50%"
            left="0%"
            transform="skewY(20deg)"
            h="100%"
            w="100%"
            zIndex="-10"
            >

            </Box>
            <Text>
                {name}
            </Text>
            <Flex 
            alignItems="center"
            justifyContent="space-between"
            mb={2}
            px={2}
            width="100%"
            >
                <Button size="sm">
                    Add to Cart 
                </Button>
                <Text 
                fontWeight="bold"
                >
                    {price}
                </Text>
            </Flex>
            <Rating />
        </Flex>
    );
};

export default Product;