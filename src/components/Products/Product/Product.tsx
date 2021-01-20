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

import Rating from "@/components/Products/Rating/Rating";
import { getStorage, setStorage } from "@/utils/storage";

export interface IProduct {
    id: string;
    image: string[];
    name: string;
    price: number;
    __typename?: string;
}

export interface ISavedProduct {
    id: string
}

interface IMouseEventOnHTMLElement extends React.MouseEvent {
    currentTarget: HTMLElement
}

const Product: React.FC<IProduct> = ({ id, image = "/img.webp", name, price }) => {

    const router = useRouter();

    const toggleProductInStorage = (event: IMouseEventOnHTMLElement) => {
        const ID = id;
        const KEY = "saved-products";

        const products = getStorage(KEY);

        if (!products) {
            setStorage(KEY, [{ id: ID }]);
            event.currentTarget.style.color = "pink";
            return;
        }
        
        if (Array.isArray(products)) {
            
            const filterDuplicateItems = products.filter(product => product.id !== ID);
            
            if (filterDuplicateItems.length < products.length) {
                setStorage(KEY, filterDuplicateItems);
                event.currentTarget.style.color = "black";
                return;
            }
            
            const addNewItems = [...products, { id: ID }];
            
            setStorage(KEY, addNewItems);
            event.currentTarget.style.color = "pink";
        }
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
            <Tooltip
            label={router.pathname === "/saved-products" ? "remove product" : "save product"}
            fontSize="xs"
            hasArrow
            placement="top"
            >
                <span>
                    <IconButton 
                    aria-label="save item"
                    onClick={(event) => toggleProductInStorage(event)}
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
                    mb={4}
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