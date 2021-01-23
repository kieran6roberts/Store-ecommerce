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

import { IMouseEventOnHTMLElement } from "@/components/Products/Products";
import Rating from "@/components/Products/Rating/Rating";
import { getStorage, setStorage} from "@/utils/storage";

export interface IProduct {
    clickSave: (event: IMouseEventOnHTMLElement) => void;
    description: {
        text: string
    };
    image: string[];
    name: string;
    price: number;
    __typename?: string;
}

export interface IProductWithId extends IProduct {
    id: string
}

const Product: React.FC<IProductWithId> = ({ 
    clickSave,
    description,
    image = "/img.webp", 
    id,
    name, 
    price
 }) => {

    const router = useRouter();

    const addProductToCart = (event: IMouseEventOnHTMLElement) => {
        const cartKey = "cart";

        const userCart = getStorage(cartKey);

        const product = {
            id,
            name,
            price,
            description
        };

        event.target.textContent = "Added";

        if (!userCart) {
            setStorage(cartKey, [product]);
            return;
        }

        userCart.push(product);
        setStorage(cartKey, userCart);
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
                    onClick={clickSave}
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
                        alt="product image"
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
                    £{price}
                </Text>
            </Flex>
            <Rating />
        </Flex>
    );
};

export default Product;