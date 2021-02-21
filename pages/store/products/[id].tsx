import { useMutation, useQuery } from "@apollo/client";
import { Button,
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
    useColorModeValue, 
    VStack} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import * as React from "react";

import Layout from "@/components/Layout/Layout";
import Products from "@/components/Products/Products";
import Review, { IReviewInputs } from "@/components/Products/Review/Review";
import { useStoreUpdate } from "@/hooks/useStorage";
import { initApollo } from "@/lib/apolloClient";
import { PRODUCT_INFO, PRODUCT_NAMES, PRODUCT_NEW } from "@/queries/products";
import { CREATE_REVIEW, GET_REVIEWS } from "@/queries/reviews";
import { generateItemKey } from "@/utils/generateItemKey";

interface IProductName {
    name: string,
    __typename: string
}

interface IReviewData {
    reviews: IReviewInputs
}


const Product: NextPage<any> = ({ initialApolloState }) => {
    const ref = initialApolloState.ROOT_QUERY.products[0].__ref;
    const product = initialApolloState[ref];

    const { addCartValue } = useStoreUpdate()!;

    console.log(product)

    const { 
        name: productName, 
        price: productPrice, 
        id: productId, 
        images: productImage,
        category: { name: productCategory },
        description: { text: productDescription }
    } = product;

    const addProductToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
        (event.target as HTMLButtonElement).textContent = "Added";
        addCartValue(product);
    };

    const { data, error, loading } = useQuery<IReviewData>(GET_REVIEWS);
    const [ addReview, { 
        loading: mutationLoading, 
        error: mutationError 
    }] = useMutation(CREATE_REVIEW);

    const handleReviewSubmit = (mutationVariable: IReviewInputs) => {
        addReview({
            variables: mutationVariable,
            update: (store, { data }) => {
                const reviewData = store.readQuery({
                    query: GET_REVIEWS
                });

                store.writeQuery({
                    query: GET_REVIEWS,
                    data: {
                        reviews: [...reviewData.reviews, data.createReview]
                    }
                });
            }
        });
    };

    const mapReviewsToDom = (input: IReviewInputs[]) => {
        return input.map(review => 
            <li 
            key={generateItemKey(review.headline)}
            mb={4}
            >
                <Heading 
                as="h4"
                fontSize="sm"
                fontWeight="400"
                mb={2}
                >
                    {review.name}
                </Heading>
                <Heading 
                as="h5"
                fontSize="md"
                >
                    {review.headline}
                </Heading>
                <Text mb={6}>
                    {`Rating: ${review.rating} out of 5`}
                </Text>
                <Text>
                    {review.message}
                </Text>
            </li>
        );
    };

    return (
        <Layout>
            <Heading 
            as="h3"
            mb={4}
            >
                {productName}
            </Heading>
            <Flex 
            direction={["column", "column", "row"]}
            h="400px"
            >
                <Center 
                borderRadius="sm"
                flex="1"
                mb={[12, 12, 0]}
                mr={[0, 0, 2]}
                shadow="base"
                position="relative"
                >
                    <Image
                    alt={productName}
                    src={`/${productImage[0].fileName}`}
                    layout="fill"
                    objectFit="cover"
                    />
                </Center>
                <Tabs 
                flex="1"
                isFitted
                isLazy
                ml={[0, 0, 2]}
                variant="enclosed"
                >
                    <TabList>
                        <Tab>
                            Product Description
                        </Tab>
                        <Tab>
                            Details
                        </Tab>
                        <Tab>
                            Reviews
                        </Tab>
                    </TabList>
                    <TabPanels fontSize="sm">
                        <TabPanel>
                            <VStack 
                            display="flex"
                            justifyContent="center"
                            h="250px"
                            spacing={6}
                            >
                                <Text>
                                    {productDescription}
                                </Text>
                                <Text>
                                    £{productPrice}
                                </Text>
                                <Button 
                                colorScheme="blue"
                                onClick={(event) => addProductToCart(event)}
                                >
                                    Add To Cart
                                </Button>
                            </VStack>
                        </TabPanel>
                        <TabPanel>
                            <Text>
                                {productCategory}
                            </Text>
                        </TabPanel>
                        <TabPanel>
                            <Review 
                            productId={productId}
                            mutationLoading={mutationLoading}
                            mutationError={mutationError}
                            submitHandler={handleReviewSubmit}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
            <Heading 
            as="h3"
            color={useColorModeValue("gray.600", "gray.200")}
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
            p={4}
            >
                {mapReviewsToDom(data ? data.reviews : [])}
            </SimpleGrid>
            <Heading 
            as="h3"
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
    );
};


export const getStaticPaths: GetStaticPaths = async () => {
    const apolloClient = initApollo();

    const { data: { products }} = await apolloClient.query({
        query: PRODUCT_NAMES
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
                variables: { name: params?.id?.split("-").join(" ") }
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