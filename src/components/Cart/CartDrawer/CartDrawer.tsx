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
import { ImCancelCircle } from "react-icons/im";

import DrawerTemplate from "@/components/DrawerTemplate/DrawerTemplate";
import { generateItemKey } from "@/utils/generateItemKey";
import { getStorage } from "@/utils/storage";

const CartDrawer = (): React.ReactElement => {

    const { isOpen, onOpen, onClose} = useDisclosure();

    const mapProductsToDom = (): React.ReactNode => {
        const products = getStorage("cart");

        if (products) {
            return products.map((product) => 
                <ListItem 
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
                        <Button 
                        color="red.300"
                        fontSize="xs"
                        leftIcon={<ImCancelCircle />}
                        variant="outline"
                        >
                            Remove
                        </Button>
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