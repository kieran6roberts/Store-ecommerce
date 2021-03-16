import { useMutation, useQuery } from "@apollo/client";
import { 
    Box,
    Button,
    Center, 
    Flex, 
    Heading,
    IconButton,
    Image,
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
import NextImage from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { AiOutlineStar } from "react-icons/ai";

import Layout from "@/components/Layout/Layout";
import NextHead from "@/components/NextHead/NextHead";
import Products from "@/components/Products/Products";
import Review, { IReviewInputs } from "@/components/Products/Review/Review";
import { useStoreUpdate } from "@/hooks/useStorage";
import { initApollo } from "@/lib/apolloClient";
import { useGetUser } from "@/lib/user";
import { PRODUCT_INFO, PRODUCT_NAMES, PRODUCT_NEW } from "@/queries/products";
import { CREATE_REVIEW, GET_REVIEWS } from "@/queries/reviews";
import { formatPrice } from "@/utils/formatPrice";
import { generateItemKey } from "@/utils/generateItemKey";

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

    const { 
        name: productName, 
        price: productPrice, 
        id: productId, 
        images: productImage,
        category: { name: productCategory },
        description: { text: productDescription }
    } = product;

    const { data: reviewData, error, loading, refetch } = useQuery<IReviewData>(GET_REVIEWS, {
        fetchPolicy: "no-cache",
        variables: {
            id: productId
        },
    });

    const { addCartValue } = useStoreUpdate()!;
    const router = useRouter();
    const { profile } = useGetUser();

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

    const [ addReview ] = useMutation(CREATE_REVIEW, { 
        ignoreResults: true, 
        refetchQueries: [{ 
            query: GET_REVIEWS,
            variables: {
                id: productId
            }
        }],
        onCompleted: refetch
    });

    const [ reviews, setReviews ] = React.useState<IReviewInputs[] | undefined>();

    const handleReviewSubmit = (mutationVariable: any) => {
        addReview({
            variables: mutationVariable
        });
    };
    
    React.useEffect(() => {
        setReviews(reviewData?.reviews);
    }, [ reviewData ]);

    const mapReviewsToDom = (input: IReviewInputs[]) => input.map(review => 
            <Box 
            as="li"
            bg={useColorModeValue("gray.50", "gray.700")}
            borderRadius="md"
            key={generateItemKey(review.headline)}
            mb={4}
            p={4}
            >
                <Flex 
                align="center"
                justify="flex-start"
                mb={4}
                >
                    {review?.userPicture ?
                    <Box mr={4}>
                        <Image 
                        alt="user profile pic"
                        boxSize={["20px", "20px", "20px", "30px"]}
                        src={review.userPicture}
                        /> 
                    </Box> : null}
                    <Heading 
                    as="h4"
                    fontSize="xs"
                    fontWeight="400"
                    >
                        {review.name}
                    </Heading>
                </Flex>
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
                        bg={parseInt(review.rating) >= 1 ? "orange.300" : "transparent"}
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
                        bg={parseInt(review.rating) >= 2 ? "orange.300" : "transparent"}
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
                        bg={parseInt(review.rating) >= 3 ? "orange.300" : "transparent"}
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
                        bg={parseInt(review.rating) >= 4 ? "orange.300" : "transparent"}
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
                        bg={parseInt(review.rating) >= 5 ? "orange.300" : "transparent"}
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
            </Box>);

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
                                    {formatPrice(productPrice)}
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
                            mutationLoading={loading}
                            mutationError={error}
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
                {reviews && reviews.length ? mapReviewsToDom(reviews) : <Text>No Reviews yet</Text>}
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
        </>
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