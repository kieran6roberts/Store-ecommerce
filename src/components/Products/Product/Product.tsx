import { 
    Box, 
    Button,
    Flex, 
    IconButton, 
    Link, 
    Text,
    Tooltip,
    useColorModeValue, 
    VStack} from "@chakra-ui/react";
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
    image,
    id,
    name, 
    price
 }) => {

    const router = useRouter();

    const { addCartValue, toggleSavedValue } = useStoreUpdate()!;

    const product = {
        category,
        description,
        image, 
        id,
        name, 
        price
    };

    const addProductToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
        (event.target as HTMLButtonElement).textContent = "Added";
        addCartValue(product);
    };


    return (
        <Flex
        alignItems="flex-end"
        borderRadius="md"
        bg={useColorModeValue("gray.50", "gray.900")}
        color={useColorModeValue("gray.800", "gray.50")}
        flexDirection="column"
        fontSize="sm"
        h="380px"
        overflow="hidden"
        position="relative"
        shadow="base"
        w="300px"
        >
            <Tooltip
            label={router.pathname === "/saved-products" ? "remove product" : "save product"}
            fontSize="xs"
            hasArrow
            placement="right"
            >
                <span>
                    <IconButton 
                    aria-label="save item"
                    bg="gray.100"
                    colorScheme="pink"
                    onClick={() => toggleSavedValue("saved-products", product)}
                    icon={router.pathname === "/saved-products" ?
                    <TiDeleteOutline /> 
                    : <AiOutlineHeart /> } 
                    position="absolute"
                    top="0"
                    right="0"
                    variant="ghost"
                    zIndex="10"
                    />
                </span>
            </Tooltip>
            <NextLink 
            href={`/store/products/${name.split(" ").join("-")}`}
            passHref
            >
                <Link 
                height="55%"
                w="100%"
                >
                    <Box 
                    h="100%"
                    w="100%"
                    >   
                        <Image
                        alt={name}
                        src={`/${image}`}
                        height={200}
                        width={300}
                        />
                    </Box>
                </Link>
            </NextLink>
            <VStack 
            h="full"
            px={2}
            pb={3}
            textAlign="center"
            w="full"
            >
                <Text 
                fontSize="md"
                textTransform="uppercase"
                >
                    {name}
                </Text>
                <Text 
                fontSize="xs"
                color={useColorModeValue("gray.500", "gray.200")}
                >
                    {description}
                </Text>
                <Text 
                fontWeight="bold"
                mb="auto"
                textAlign="center"
                >
                    £{price}
                </Text>
                <Button 
                colorScheme="pink"
                id={`btn-${product.id}`}
                onClick={addProductToCart}
                size="sm"
                >
                    + Add to Cart 
                </Button>
            </VStack>
        </Flex>
    );
};

export default Product;