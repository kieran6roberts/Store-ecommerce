import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
import { 
  Box,
  Button,
  Divider,
  Flex,
  Heading, 
  List,
  ListItem,
  Text, 
  useColorModeValue, 
  VStack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";

import CheckoutForm from "@/components/Forms/CheckoutForm/CheckoutForm";
import CurrentUser from "@/components/Layout/CurrentUser/CurrentUser";
import Layout from "@/components/Layout/Layout";
import { IUser } from "@/components/Layout/Nav/Nav";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import NextHead from "@/components/NextHead/NextHead";
import auth0 from "@/lib/auth";
import { GET_USER_ORDERS} from "@/queries/orders";
import { USER_DETAILS } from "@/queries/users";
import { formatPrice } from "@/utils/formatPrice";
import { generateItemKey } from "@/utils/generateItemKey";
import { IUsersValidation } from "@/utils/validation/users";

export interface IAccountInput {
    [key: string]: string;
}

interface IAccount {
  user: IUser;
  userInfo: IUsersValidation[];
}

interface IPreviousOrders {
    createdAt: string;
    name:string;
    total: number;
}

const Account: NextPage<IAccount> = ({ user, userInfo }) => {
    const [ editDisabled, setEditDisabled ] = React.useState<boolean>(true);
    const [ isUpdated, setIsUpdated ] = React.useState<boolean>(false);

    const { data: orderData, loading: orderLoading } = useQuery(GET_USER_ORDERS, {
      variables: {
        email: user.email
      }
    });

    const [ userDetails ] = userInfo;

    const handleUpdateUserSubmission = async (inputs: { [key:string]: string }) => {
        const auth = await fetch("/api/session", {
          method: "POST",
          body: JSON.stringify(inputs),
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res => res.json());

        //const { update_users: { returning } } = auth.data;

        //console.log(returning);

        setIsUpdated(true);
        setEditDisabled(true);
    };

    React.useEffect(() => {
      const editBtn = document.querySelector("#details-toggle") as HTMLButtonElement;
      editBtn?.focus();
    }, [ isUpdated ]);

    return (
      <>
      <NextHead 
      currentURL="http://localhost:3000/account" 
      description="Users personal coffee collection account" 
      title="Account" 
      />
      <Layout>
        <Heading 
        as="h1"
        fontSize="xl"
        pl={4}
        >
          Welcome to your user account
        </Heading>
        <Divider 
          mb={4}
          pt={4}
        />
        <Flex direction={["column", "column", "column", "row"]}>
          <VStack 
          align="flex-start"
          flex="1"
          pl={4}
          pr={12}
          py={2}
          mb={[16, 16, 16, 0]}
          spacing={8}
          >
            <CurrentUser 
            justify="flex-start"
            user={user}
            />
            <Heading 
            as="h2"
            fontSize="md"
            >
              Save details for later
            </Heading>
            <Text 
            fontSize="xs"
            >
              For quick and easy future purchases with us you can save
              your details such as delivery address allowing us to speed up the
              time before they arrrive with you. 
            </Text>
            {isUpdated ? 
            <Text 
            borderRadius="md"
            border="1px solid pink"
            color="pink.400"
            p={4}
            >
                Your account details were successfully updated!
            </Text> : null
            }
            <Button
            colorScheme="pink"
            id="details-toggle"
            onClick={() => setEditDisabled(!editDisabled)} 
            size="sm"
            variant="outline"
            >
              {editDisabled ? "Edit Details" : "Cancel Edit"}
            </Button>
            <Box 
            bg={editDisabled ? useColorModeValue("gray.50", "gray.700")  : "none" }
            borderRadius="md"
            p={4}
            w="100%"
            >
              <CheckoutForm 
              handleDisabled={() => setEditDisabled(!editDisabled)}
              isDisabled={editDisabled}
              submit={handleUpdateUserSubmission}
              submitText="Submit Details"
              userSavedDetails={userDetails}
              />
            </Box>
          </VStack>
          <VStack 
          align="flex-start"
          flex="1"
          >
            <Heading 
            as="h2"
            fontSize="md"
            mb={8}
            >
              Previous Orders
            </Heading>
            {orderLoading ? 
            <LoadingSpinner />
            :
            <List w="full">
                
                {orderData.orders.length ? 
                orderData.orders.map(({ createdAt, name, total }: IPreviousOrders) => (
                  <ListItem 
                  bg={useColorModeValue("gray.100", "gray.700")}
                  borderRadius="md"
                  key={generateItemKey(name)}
                  p={4}
                  >
                    <Text 
                    fontSize="sm"
                    fontWeight="700"
                    >
                      Order placed on {createdAt.slice(0, 10)}
                    </Text>
                    <Divider my={2} />
                    <Text fontSize="xs">
                      By: {name}
                    </Text>
                    <Text fontSize="xs">
                      Total: {formatPrice(total)}
                    </Text>
                  </ListItem>
                )) : 
                <Text fontSize="xs">
                    No Previous Orders
                </Text>}
            </List>
            }
          </VStack>
        </Flex>
      </Layout>
      </>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await auth0.getSession(ctx.req);

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  console.log(session)

  const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_HASURA_API!,
      cache: new InMemoryCache(),
      headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`
      }
  });

  const { data: { users: user }} = await client.query({
      query: USER_DETAILS,
      variables: {
          id: session.user.sub
      }
    });

  return {
    props: {
      user: session?.user ?? null,
      userInfo: user
    }
  };
};

export default Account;