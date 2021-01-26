import { Box,
    Button,
    Divider,
    Flex,
    Heading,
    List,
    ListItem, 
    Text,
    useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import * as React from "react";
import { BsArrowBarLeft } from "react-icons/bs";

import RemoveButton from "@/components/Cart/RemoveButton/RemoveButton"
import DrawerTemplate from "@/components/DrawerTemplate/DrawerTemplate";
import { IMouseEventOnHTMLElement } from "@/components/Products/Products";
import { generateItemKey } from "@/utils/generateItemKey";
import { getStorage, setStorage } from "@/utils/storage";

const CartDrawer = (): React.ReactElement => {

    const { isOpen, onOpen, onClose} = useDisclosure();

    const removeItemFromCart = (event: IMouseEventOnHTMLElement) => {
        const cartKey = "cart";
        const productElementId = event.target.closest("li")?.id;
        const products = getStorage(cartKey);

        
        if (products && productElementId) {
            document.querySelector(`#${productElementId}`)?.remove();

            const ids = products.map(product => product.id);
            const removeIndex = ids.indexOf(productElementId);

            products.splice(removeIndex, 1);

            setStorage(cartKey, products);
        }
    };

    const mapProductsToDom = (): React.ReactNode => {
        const products = getStorage("cart");

        if (products?.length) {
            return products.map((product) => 
                <ListItem 
                id={product.id}
                key={generateItemKey(product.id)}
                >
                    <Box 
                    border="1px solid #241313"
                    width="50%"
                    >
                        <Image 
                        alt={product.name}
                        height={80}
                        src="/images/img.png"
                        width={80} 
                        />
                    </Box>
                    <Flex justify="space-between">
                        <Box as="article">
                            <Heading 
                            as="h5"
                            fontSize="md"
                            mb={2}
                            >
                                Item
                            </Heading>
                            <Text fontSize="xs">
                                {product.name}
                            </Text>
                            <Text fontSize="xs">
                                £{product.price}
                            </Text>
                        </Box>
                        <RemoveButton callback={removeItemFromCart} />
                    </Flex>
                    <Divider my={8} />
                </ListItem>
            );
        } else {
            return <Text>No Items in cart</Text>;
        }
    };

    return (
        <>
        <Button 
        leftIcon={<BsArrowBarLeft />}
        onClick={onOpen}
        w="5rem"
        ml="auto"
        mr={4}
        variant="ghost"
        >
            Cart
        </Button>
        <DrawerTemplate
        header="What's in your bag"
        footer="Total: £..."
        isOpen={isOpen}
        onClose={onClose}
        overlay={false}
        size="xs"
        >
            <List>
                {mapProductsToDom()}
            </List>
        </DrawerTemplate>
        </>
    );
};

export default CartDrawer;