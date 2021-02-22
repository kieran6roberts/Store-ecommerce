import { useMutation, useQuery } from "@apollo/client";
import { Box,
    Button,
    Center, 
    Flex, 
    Heading,
    IconButton,
    List,
    ListItem,
    SimpleGrid,
    Tab, 
    TabList, 
    TabPanel,
    TabPanels, 
    Tabs, 
    Text, 
    useColorModeValue } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import * as React from "react";
import { AiOutlineStar } from "react-icons/ai";

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
        addCartValue({
            category: productCategory,
            description: productDescription,
            image: productImage[0].fileName,
            id: productId,
            name: productName,
            price: productPrice
        });
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
            <Box 
            as="li"
            bg={useColorModeValue("gray.50", "gray.700")}
            borderRadius="md"
            key={generateItemKey(review.headline)}
            mb={4}
            p={4}
            >
                <Heading 
                as="h4"
                fontSize="xs"
                fontWeight="400"
                mb={2}
                >
                    {review.name}
                </Heading>
                <Heading 
                as="h5"
                fontSize="md"
                mb={4}
                >
                    {review.headline}
                </Heading>
                <List
                as="ul" 
                display="flex"
                mb={4}
                >
                    <ListItem 
                    mx={1}>
                        <IconButton 
                        aria-label="rate product"
                        bg={parseInt(review.rating) >= 1 ? "orange.300" : null}
                        icon={<AiOutlineStar />} 
                        isRound={true}
                        pointerEvents="none"
                        size="xs"
                        variant="ghost"
                        />
                    </ListItem>
                    <ListItem mx={1}>
                        <IconButton 
                        aria-label="rate product"
                        bg={parseInt(review.rating) >= 2 ? "orange.300" : null}
                        icon={<AiOutlineStar />} 
                        isRound={true}
                        pointerEvents="none"
                        size="xs"
                        variant="ghost"
                        />
                    </ListItem>
                    <ListItem mx={1}>
                        <IconButton
                        aria-label="rate product"
                        bg={parseInt(review.rating) >= 3 ? "orange.300" : null}
                        icon={<AiOutlineStar />} 
                        isRound={true}
                        pointerEvents="none"
                        size="xs"
                        variant="ghost"
                        />
                    </ListItem>
                    <ListItem mx={1}>
                        <IconButton 
                        aria-label="rate product"
                        bg={parseInt(review.rating) >= 4 ? "orange.300" : null}
                        icon={<AiOutlineStar />} 
                        isRound={true}
                        pointerEvents="none"
                        size="xs"
                        variant="ghost"
                        />
                    </ListItem>
                    <ListItem mx={1}>
                        <IconButton 
                        aria-label="rate product"
                        bg={parseInt(review.rating) >= 5 ? "orange.300" : null}
                        icon={<AiOutlineStar />} 
                        isRound={true}
                        pointerEvents="none"
                        size="xs"
                        variant="ghost"
                        />
                    </ListItem>
                </List>
                <Text 
                bg={useColorModeValue("white", "gray.800")}
                h="full"
                p={2}
                >
                    {review.message}
                </Text>
            </Box>
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
                colorScheme="pink"
                flex="1"
                isFitted
                isLazy
                ml={[0, 0, 2]}
                variant="enclosed"
                >
                    <TabList>
                        <Tab>
                            Purchase
                        </Tab>
                        <Tab>
                            Category
                        </Tab>
                        <Tab>
                            Review
                        </Tab>
                    </TabList>
                    <TabPanels fontSize="sm">
                        <TabPanel>
                            <Flex 
                            flexDirection="column"
                            justify="flex-start"
                            h="320px"
                            >
                                <Text>
                                    {productDescription}
                                </Text>
                                <Text 
                                alignSelf="flex-end"
                                mt="auto"
                                >
                                    £{productPrice.toFixed(2)}
                                </Text>
                                <Button 
                                alignSelf="flex-end"
                                colorScheme="pink"
                                className={`btn-${productId}`}
                                mt={8}
                                onClick={addProductToCart}
                                variant="solid"
                                >
                                    Add To Cart
                                </Button>
                            </Flex>
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