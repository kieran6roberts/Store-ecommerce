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
    VStack} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import * as React from "react";

import Layout from "@/components/Layout/Layout";
import Review from "@/components/Products/Review/Review";
import { useStoreUpdate } from "@/hooks/useStorage";
import { initApollo } from "@/lib/apolloClient";
import { PRODUCT_INFO, PRODUCT_NAMES } from "@/queries/products";
import { CREATE_REVIEW, GET_REVIEWS, TEST_REVIEW } from "@/queries/reviews";
import { generateItemKey } from "@/utils/generateItemKey";

interface IProductName {
    name: string,
    __typename: string
}

const Product: NextPage = ({ initialApolloState }) => {
    const ref = initialApolloState.ROOT_QUERY.products[0].__ref;
    const product = initialApolloState[ref];

    const { addCartValue } = useStoreUpdate()!;

    const { 
        name: productName, 
        price: productPrice, 
        id: productId, 
        category: { name: productCategory },
        description: { text: productDescription }
    } = product;

    const addProductToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
        (event.target as HTMLButtonElement).textContent = "Added";
        addCartValue(product);
    };

    const { data, error, loading } = useQuery(GET_REVIEWS);
    const [ addReview, { 
        data: mutationData, 
        loading: mutationLoading,
        error: mutationError } ] = useMutation(TEST_REVIEW);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error :</p>;
    }

    const { reviews } = data;
    console.log(reviews);


    
    const handleReviewSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        addReview({
            variables: {
                name,
                headline,
                message,
                rating
            },
            refetchQueries: [{ query: GET_REVIEWS }]
        });

        const submitBtn = document.querySelector("#review-submit")! as HTMLButtonElement;
        
        console.log(mutationData);
    };

    const mapReviewsToDom = (input) => {
        return input.map((review) => 
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
            >
                <Center 
                border="1px solid black"
                flex="1"
                mb={[12, 12, 0]}
                mr={[0, 0, 2]}
                >
                    <Image
                    alt="alt"
                    height={375}
                    src="/img.png"
                    width={300}
                    />
                </Center>
                <Tabs 
                defaultIndex={1}
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
            size="md"
            my={12}
            >
                Current Reviews
            </Heading>
            <SimpleGrid
            as="ul"
            border="1px solid gray"
            columns={[1, 1, 2, 2, 3, 4]} 
            fontSize="sm"
            listStyleType="none"
            spacing="2rem"
            p={4}
            >
                {mapReviewsToDom(reviews)}
            </SimpleGrid>
            <Heading 
            as="h3"
            size="md"
            mt={12}
            >
                Other Products you might like
            </Heading>
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