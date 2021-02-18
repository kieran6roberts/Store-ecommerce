import { Box, 
    Button,
    Flex, 
    IconButton, 
    Link, 
    Text,
    Tooltip } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

import { useStoreUpdate } from "@/hooks/useStorage";
import { IProductStorage } from "@/utils/storage";

const Product: React.FC<IProductStorage> = ({ 
    category,
    description,
    image = "/img.webp", 
    id,
    name, 
    price,
    quantity = 1
 }) => {

    const router = useRouter();

    const { addCartValue, toggleSavedValue } = useStoreUpdate()!;

    const product = {
        category,
        description,
        image, 
        id,
        name, 
        price: price * quantity,
        quantity
    };

    const addProductToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
        (event.target as HTMLButtonElement).textContent = "Added";
        addCartValue(product);
    };

    return (
        <Flex
        flexDirection="column"
        alignItems="flex-end"
        fontSize="sm"
        h="380px"
        overflow="hidden"
        position="relative"
        p={2}
        shadow="base"
        w="300px"
        >
            <Tooltip
            label={router.pathname === "/saved-products" ? "remove product" : "save product"}
            fontSize="xs"
            hasArrow
            placement="top"
            >
                <span>
                    <IconButton 
                    aria-label="save item"
                    onClick={() => toggleSavedValue("saved-products", product)}
                    icon={router.pathname === "/saved-products" ?
                    <TiDeleteOutline /> 
                    : <AiOutlineHeart /> } />
                </span>
            </Tooltip>
            <NextLink 
            href={`/store/products/${name.split(" ").join("-")}`}
            passHref
            >
                <Link 
                height="60%"
                mb={2}
                w="100%"
                >
                    <Box 
                    border="1px solid black"
                    h="100%"
                    mt={2}
                    w="100%"
                    >   
                        <Image
                        alt={name}
                        src={image}
                        height={200}
                        width={300}
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
            <Text my={4}>
                {name}
            </Text>
            <Flex 
            alignItems="center"
            justifyContent="space-between"
            mb={2}
            px={2}
            width="100%"
            >
                <Button 
                colorScheme="blue"
                onClick={addProductToCart}
                size="sm"
                >
                    Add to Cart 
                </Button>
                <Text 
                fontWeight="bold"
                >
                    £{price * quantity}
                </Text>
            </Flex>
        </Flex>
    );
};

export default Product;