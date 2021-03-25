import { 
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    Link,
    List,
    ListItem, 
    Text,
    useColorModeValue,    
    useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { BsArrowBarLeft } from "react-icons/bs";
import { IoCartOutline } from "react-icons/io5";

import RemoveButton from "@/components/Cart/RemoveButton/RemoveButton";
import DrawerTemplate from "@/components/DrawerTemplate/DrawerTemplate";
import { useStore, useStoreUpdate } from "@/hooks/useStorage";
import { generateItemKey } from "@/utils/generateItemKey";

const paths = ["/cart", "/checkout", "/checkout/shipping", "/checkout/review"];

const CartDrawer: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();

    const { cartStorage } = useStore()!;
    const { removeCartValue } = useStoreUpdate()!;

    const mapProductsToDom = (): React.ReactNode => {
        if (cartStorage?.length) {
            return cartStorage.map((product) => 
                <ListItem 
                bg={useColorModeValue("gray.100", "gray.900")}
                id={product.id}
                mb={2}
                key={generateItemKey(product.id)}
                p={4}
                >
                    <Box 
                    m="auto"
                    w="100%"
                    >
                        <Image 
                        alt={product.name}
                        height={140}
                        src={`/${product.image}`}
                        width={200} 
                        />
                    </Box>
                    <Flex 
                    justify="space-between"
                    mt={2}
                    >
                        <Box as="article">
                            <Heading 
                            as="h5"
                            fontSize="sm"
                            mb={2}
                            >
                                {product.name}
                            </Heading>
                            <Text 
                            fontSize="sm"
                            mb={4}
                            >
                                {product.category}
                            </Text>
                               <RemoveButton callback={(event) => removeCartValue(event)} />
                        </Box>
                    </Flex>
                </ListItem>
            );
        } else {
            return <Text fontSize="sm" color="pink.200">Your cart is currently empty</Text>;
        }
    };

    const hasMounted = React.useRef(false);

    React.useEffect(() => {
        if (hasMounted.current && !paths.includes(router.pathname)) {
           onOpen();
        } else {
            hasMounted.current = true;
        }
    }, [ cartStorage ]);

    return (
        <>
        {!paths.includes(router.pathname) ? 
        <Button 
        bg="pink.400"
        color="white"
        fontSize="sm"
        leftIcon={<BsArrowBarLeft />}
        onClick={onOpen}
        ml="auto"
        mt={{xl: 12}}
        mr={[4, 4, 4, 6]}
        py={[1, 1, 2, 3, 8]}
        px={[1, 1, 2, 6, 16]}
        variant="ghost"
        w={{base: "5rem", xl: "10rem"}}
        _hover={{
            bg: "pink.500"
        }}
        >
            Cart
        </Button> : null}
        <DrawerTemplate
        header="What's in your bag"
        footer="Kieran's Coffee Collection @2021"
        isOpen={isOpen}
        onClose={onClose}
        placement="right"
        size="sm"
        >
            <NextLink 
            href="/cart"
            passHref
            >
                <Link 
                alignItems="center"
                bg={useColorModeValue("gray.100", "gray.800")}
                borderRadius="md"
                display="flex"
                py={{base: 2, xl: 6}}
                px={{base: 2, xl: 6}}
                w="max-content"
                _hover={{
                    bg: useColorModeValue("gray.200", "gray.900"),
                    color: "pink.300"
                }}
                >
                    <Box 
                    alignSelf="center"
                    bgGradient="linear(45deg, blue.300, green.300)"
                    display="inline-flex"
                    mr={2}
                    p={1}
                    >
                          <IoCartOutline style={{ color: "white" }} />
                    </Box>
                   To the cart
                </Link>
            </NextLink>
            <Divider 
            bg="pink.100"
            my={{base: 4, xl: 12}} />
            <List>
                {mapProductsToDom()}
            </List>
        </DrawerTemplate>
        </>
    );
};

export default CartDrawer;