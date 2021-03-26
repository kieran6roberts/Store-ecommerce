import { 
    Button,
    Checkbox, 
    Flex, 
    Heading, 
    Link, 
    StackDivider, 
    Text,
    useColorModeValue,
    VStack } from "@chakra-ui/react";
import { loadStripe } from "@stripe/stripe-js";
import { GetServerSideProps , NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import nookies from "nookies";
import * as React from "react";
import { BsArrowLeft } from "react-icons/bs";

import CartHeader from "@/components/Cart/CartHeader/CartHeader";
import Layout from "@/components/Layout/Layout";
import NextHead from "@/components/NextHead/NextHead";
import { useCheckout } from "@/hooks/useCheckoutData";
import { useStore } from "@/hooks/useStorage";
import { mapCartStorage } from "@/utils/mapCartStorage";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Shipping: NextPage = () => {

    const { cartStorage } = useStore()!;
    const { userDetails } = useCheckout()!;
    const router = useRouter();

    const lineItems = cartStorage?.map(item => ({ 
        id: item.id, 
        quantity: item.quantity,
        ...userDetails
    }));

    const handlePaymentInit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        
        const stripe = await stripePromise;

        const session = await fetch("/api/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(lineItems)
        }).then(res => res.json());

        const result = stripe?.redirectToCheckout({
            sessionId: session.id
        }).then(res => {
            if (res.error) {
                console.log(res.error.message);
            }
        });
    };

    React.useEffect(() => {
        if (!userDetails) {
            router.push("/checkout");
        }
    }, []);

    return (
        <>
        <NextHead 
        currentURL="http://localhost:3000/checkout/shipping" 
        description="Confirm order shipping details" 
        title="Confirm Shipping" 
        />
        <Layout>
            <Flex 
            as="section"
            alignItems="flex-start"
            flexDirection={["column", "column", "column", "row"]}
            m={4}
            >
                <VStack 
                align="flex-start"
                flex="2"
                mb={12}
                pr={[0, 0, 8]}
                w="100%"
                >
                    <CartHeader />
                    <Flex 
                    bg="blue.300"
                    borderRadius="sm"
                    color="white"
                    flexDirection={["column", "row"]}
                    fontSize="md"
                    justify="space-between"
                    p={{base: 2, xl: 6}}
                    w="100%"
                    >
                        <Text 
                        fontWeight={700}
                        mb={[2, 0]}
                        >
                            Contact
                        </Text>
                        {userDetails ?
                        <Text>
                            {userDetails.email} | {userDetails.phone}
                        </Text>
                        :
                        <Text>
                            Not Available
                        </Text>
                        }
                        <Text mt={[4, 0]}>
                            <NextLink 
                            href="/checkout" 
                            passHref
                            >
                                <Link       
                                bg="pink.400"
                                borderRadius="md"
                                color="white"
                                p={{base: 1, xl: 4}}
                                _hover={{
                                    bg: "pink.500"
                                }}
                                >
                                  Change
                                </Link>
                            </NextLink>
                        </Text>
                    </Flex>
                    <Flex 
                    bg="blue.300"
                    borderRadius="sm"
                    color="white"
                    flexDirection={["column", "row"]}
                    fontSize="md"
                    justify="space-between"
                    mb={8}
                    p={{base: 2, xl: 6}}
                    w="full"
                    >
                        <Text 
                        fontWeight={700}
                        mb={[2, 0]}
                        >
                            Shipping To
                        </Text>
                        {userDetails ?
                        <Text>
                            {`${userDetails.address} |  ${userDetails.city}`}
                        </Text>
                        :
                        <Text>
                            Not available
                        </Text>
                        }
                        <Text mt={[4, 0]}>
                            <NextLink 
                            href="/checkout" 
                            passHref
                            >
                                <Link 
                                bg="pink.400"
                                borderRadius="md"
                                color="white"
                                p={{base: 1, xl: 4}}
                                _hover={{
                                    bg: "pink.500"
                                }}
                                >
                                  Change
                                </Link>
                            </NextLink>
                        </Text>
                    </Flex>
                    <Heading 
                    as="h3"
                    fontSize="md"
                    mb={{base: 2, xl: 8}}
                    >
                        Shipping Method
                    </Heading>
                    <Flex 
                    bg={useColorModeValue("gray.100", "gray.700")}
                    borderRadius="sm"
                    fontSize="sm"
                    justify="space-between"
                    maxW="800px"
                    mb={8}
                    p={{base: 2, xl: 6}}
                    w="full"
                    >
                        <Checkbox 
                        defaultChecked
                        isDisabled
                        >
                            Currently Free Shipping
                        </Checkbox>
                        <Text>
                            Free
                        </Text>
                    </Flex>
                    <Button
                    bg="pink.400"
                    borderRadius="md"
                    color="white"
                    onClick={handlePaymentInit}
                    my={8}
                    p={8}
                    size="sm"
                    _hover={{
                        bg: "pink.500"
                    }}
                    >
                        Continue to Payment
                    </Button>
                    <NextLink 
                    href="/checkout" 
                    passHref
                    >
                        <Link 
                        bg={useColorModeValue("gray.100", "gray.700")}
                        border="1px solid pink"
                        borderRadius="md"
                        color={useColorModeValue("gray.800", "white")}
                        display="block"
                        fontSize="sm"
                        ml="auto"
                        p={{base: 2, xl: 6}}
                        _hover={{
                            bg: useColorModeValue("gray.200","gray.800")
                        }}
                        >
                            <BsArrowLeft style={{ display: "inline-block" }} /> Back to cart
                        </Link>
                    </NextLink>
                </VStack>
                <VStack
                as="ul"
                bg={useColorModeValue("gray.50", "gray.900")}
                border="2px solid pink"
                borderRadius="md"
                flex="1.5"
                divider={<StackDivider borderColor={useColorModeValue("pink.50", "gray.600")} />}
                listStyleType="none"
                mr={["0px", "0px", "0px", "0.5rem"]}
                pl={[0, 0, 0, 0, 8]}
                position="sticky"
                top="16"
                w="100%"
                >
                    {mapCartStorage(cartStorage, true)}
                </VStack>
            </Flex>
        </Layout>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookies = nookies.get(ctx);

    if(!cookies["checkout-session"]) {
        return {
            redirect: {
                destination: "/cart",
                permanent: false
            }
        };
    }

    return {
        props: {}
    };
};

export default Shipping;