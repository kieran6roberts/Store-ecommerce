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

import { useStore, useStoreUpdate } from "@/hooks/useStorage";
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
    const { cartStorage, savedStorage } = useStore()!;

    const [ isSaved, setIsSaved ] = React.useState<boolean>(() => savedStorage?.some(item => item.id === id) ? true : false);

    const product = {
        category,
        description,
        image, 
        id,
        name, 
        price
    };

    const addProductToCart = () => addCartValue(product);

    const handleSaveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const curTarget = event.currentTarget as HTMLButtonElement;
            if (!isSaved) {
                (curTarget.firstElementChild as HTMLElement).style.color = "#fff";
            } else {
                (curTarget.firstElementChild as HTMLElement).style.color = "#ED64A6";
            }
            
            setIsSaved(!isSaved);
            toggleSavedValue("saved-products", product);
    };

    return (
        <Flex
        alignItems="flex-end"
        borderRadius="md"
        bg={useColorModeValue("gray.50", "gray.900")}
        color={useColorModeValue("gray.800", "gray.50")}
        flexDirection="column"
        fontSize="sm"
        h={{ base: "440px", xl: "575px"}}
        m="auto"
        overflow="hidden"
        position="relative"
        shadow="base"
        w={{base: "310px", xl: "400px"}}
        zIndex={0}
        >
            <Tooltip
            label={isSaved ? "Remove Save" : "Save"}
            fontSize="xs"
            hasArrow
            placement="top-end"
            >
                <span>
                    <IconButton 
                    aria-label="save item"
                    borderRadius="none"
                    borderBottomLeftRadius="md"
                    className={`save-btn-${id}`}
                    bg={isSaved ? "pink.500" : "white"}
                    color={isSaved ? "white" : "pink.400"}
                    _hover={{
                        bg: isSaved ? "pink.600" : "gray.100"
                    }}
                    _active={{
                        bg: isSaved ? "pink.600" : "gray.100"
                    }}
                    onClick={handleSaveClick}
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
                aria-label={`${name} page`}
                height="55%"
                w="100%"
                >
                    <Box 
                    h="100%"
                    w="100%"
                    _hover={{
                        transform: "scale(1.03)",
                        transition: "transform 300ms ease-in"
                    }}
                    >   
                        <Image
                        alt={name}
                        src={`/${image}`}
                        height={300}
                        width={400}
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
                mt={{base: "0", xl: "1rem"}}
                >
                    {name}
                </Text>
                <Text 
                color={useColorModeValue("gray.600", "gray.200")}
                fontSize="xs"
                mb="auto"
                >
                    {description}
                </Text>
                <Text 
                fontWeight="bold"
                textAlign="center"
                >
                    €{(price / 100).toFixed(2)}
                </Text>
                <Button 
                className={`btn-${product.id}`}
                colorScheme="pink"
                onClick={addProductToCart}
                size="sm"
                variant="solid"
                >
                    {cartStorage?.some(item => item.id === id) ? "In Cart" : "+ Add To Cart"}
                </Button>
            </VStack>
        </Flex>
    );
};

export default React.memo(Product);