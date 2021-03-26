import { useMutation, useQuery } from "@apollo/client";
import { 
    Button,
    Center, 
    Flex, 
    Heading,
    SimpleGrid,
    Tab, 
    TabList, 
    TabPanel,
    TabPanels, 
    Tabs, 
    Text, 
    useColorModeValue } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import NextImage from "next/image";
import { useRouter } from "next/router";
import * as React from "react";

import Layout from "@/components/Layout/Layout";
import NextHead from "@/components/NextHead/NextHead";
import Products from "@/components/Products/Products";
import Review, { IReviewInputs } from "@/components/Products/Review/Review";
import UserReview from "@/components/Products/UserReview/UserReview";
import { useStore, useStoreUpdate } from "@/hooks/useStorage";
import { initApollo } from "@/lib/apolloClient";
import { useGetUser } from "@/lib/user";
import { PRODUCT_INFO, PRODUCT_NAMES, PRODUCT_NEW } from "@/queries/products";
import { CREATE_REVIEW, GET_REVIEWS } from "@/queries/reviews";
import { formatPrice } from "@/utils/formatPrice";

interface IProductName {
    name: string,
    __typename: string
}

interface IReviewData {
    reviews: IReviewInputs[];
}


const Product: NextPage<any> = ({ initialApolloState }) => {
    const ref = initialApolloState.ROOT_QUERY.products[0].__ref;
    const product = initialApolloState[ref];

    const router = useRouter();
    const { cartStorage } = useStore()!;
    const { addCartValue } = useStoreUpdate()!;
    const { profile } = useGetUser();

    const { 
        name: productName, 
        price: productPrice, 
        id: productId, 
        images: productImage,
        category: { name: productCategory },
        description: { text: productDescription }
    } = product;

    const { data: reviewData, error, loading, client } = useQuery<IReviewData>(GET_REVIEWS, {
        fetchPolicy: "network-only",
        nextFetchPolicy: "cache-only",
        onCompleted: async ({ reviews }) => {
            if (!reviews[0]) {
                return;
            }
            if (reviews[0]?.product?.id !== productId) {
                await client.resetStore();
                return;
            }
        },
        variables: {
            id: productId
        },
    });

    const [ addReview, { 
        loading: mutationLoading, 
        error: mutationError
    }] = useMutation(CREATE_REVIEW);

    const updateCartStatus = () => {
        addCartValue({
            category: productCategory,
            description: productDescription,
            image: productImage[0].fileName,
            id: productId,
            name: productName,
            price: productPrice
        });
    };

    const handleReviewSubmit = (mutationVariable: any) => {
        addReview({
            variables: mutationVariable,
            update: (cache, { data: { createReview }}) => {
                cache.writeQuery({
                    query: GET_REVIEWS,
                    data: {
                        reviews: [ createReview ]
                    },
                    variables: {
                        id: productId
                    },
                });
            }
        });
    };


    return (
        <>
        <NextHead 
        currentURL={`http://localhost:3000${router.asPath}`}
        description={`${productDescription}`} 
        title={`${productName}`} 
        />
        <Layout>
            <Heading 
            as="h3"
            mb={{ base: "1rem", xl: "4rem"}}
            >
                {productName}
            </Heading>
            <Flex 
            direction={["column", "column", "column", "row"]}
            h={{ base: "800px", lg: "400px", xl: "600px"}}
            >
                <Center 
                borderRadius="sm"
                flex="1"
                mb={[12, 12, 12, 0]}
                shadow="base"
                position="relative"
                >
                    <NextImage
                    alt={productName}
                    src={`/${productImage[0].fileName}`}
                    layout="fill"
                    objectFit="cover"
                    />
                </Center>
                <Tabs 
                colorScheme="pink"
                flex="1"
                isFitted
                isLazy
                ml={[0, 0, 2]}
                variant="enclosed"
                >
                    <TabList>
                        <Tab p={{ base: "0px", xl: "1.5rem"}}>
                            Purchase
                        </Tab>
                        <Tab>
                            Category
                        </Tab>
                        <Tab>
                            Write Review
                        </Tab>
                    </TabList>
                    <TabPanels fontSize="sm">
                        <TabPanel>
                            <Flex 
                            flexDirection="column"
                            justify="flex-start"
                            h="380px"
                            >
                                <Text mt={{base: "0", xl: "1rem"}}>
                                    {productDescription}
                                </Text>
                                <Text 
                                alignSelf="flex-end"
                                fontWeight="700"
                                mt="auto"
                                >
                                    {formatPrice(productPrice)}
                                </Text>
                                <Button 
                                alignSelf="flex-end"
                                bg="pink.400"
                                color="white"
                                fontSize="sm"
                                className={`btn-${productId}`}
                                id={`btn-add-${productId}`}
                                mt={8}
                                py={[1, 1, 2, 3, 8]}
                                px={[1, 1, 2, 6, 16]}
                                onClick={updateCartStatus}
                                variant="solid"
                                >
                                   {cartStorage?.some(item => item.id === productId) ? "In Cart" : "+ Add To Cart"}
                                </Button>
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <Flex h="380px">
                                <Text>
                                    {productCategory}
                                </Text>
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <Review 
                            productId={productId}
                            mutationLoading={mutationLoading}
                            mutationError={mutationError}
                            submitHandler={handleReviewSubmit}
                            user={profile?.nickname ?? null}
                            userPicture={profile?.picture ?? null}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
            <Heading 
            as="h3"
            color={useColorModeValue("gray.600", "gray.200")}
            fontSize="lg"
            size="md"
            my={12}
            >
                Current Reviews {loading ? " - Loading" : error ? "Unable to get reviews for this product" : null}
            </Heading>
            <SimpleGrid
            as="ul"
            columns={[1, 1, 2, 2, 3, 4]} 
            fontSize="sm"
            listStyleType="none"
            spacing="2rem"
            p={{base: 4, xl: 8}}
            >
                {reviewData?.reviews.length ? 
                <UserReview reviews={reviewData.reviews} /> 
                : 
                <Text>No Reviews yet</Text>}
            </SimpleGrid>
            <Heading 
            as="h3"
            fontSize="lg"
            color={useColorModeValue("gray.600", "gray.200")}
            size="md"
            my={12}
            >
                Other Products you might like
            </Heading>
            <Products
            loadMore={false} 
            query={PRODUCT_NEW} 
            variables={{
            ssr: false,
            fetchPolicy: "no-cache"
            }}
            />
        </Layout>
        </>
    );
};


export const getStaticPaths: GetStaticPaths = async () => {
    const apolloClient = initApollo();

    const { data: { products }} = await apolloClient.query({
        query: PRODUCT_NAMES,
        fetchPolicy: "no-cache"
    });

    const paths = products.map((product: IProductName) => ({
        params: { id: product.name.split(" ").join("-")}
    }));

    return { 
        paths,
        fallback: false
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const apolloClient = initApollo();

    if (typeof params?.id === "string") {
            await apolloClient.query({
                query: PRODUCT_INFO,
                variables: { name: params?.id?.split("-").join(" ") },
            });
    }

    return {
        props: {
            initialApolloState: apolloClient.cache.extract()
        },
        revalidate: 1
    };
};

export default Product;