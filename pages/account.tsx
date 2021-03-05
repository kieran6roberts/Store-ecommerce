import { useMutation, useQuery } from "@apollo/client";
import { 
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
import auth0 from "@/lib/auth";
import { GET_USER_ORDERS } from "@/queries/orders";
import { UPDATE_USER } from "@/queries/users";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { generateItemKey } from "@/utils/generateItemKey";

export interface IAccountInput {
  [key: string]: string;
}

const Account: NextPage<{ user: IUser }> = ({ user }) => {
  const [ editDisabled, setEditDisabled ] = React.useState<boolean>(true);

  const { data, loading } = useQuery(GET_USER_ORDERS, {
    variables: {
      email: user.email
    }
  });

  const handleUpdateUserSubmission = async (mutationVariable: IAccountInput) => {
    /*
    updateUsers({
            context: { clientName: "users" },
            variables: mutationVariable,
            update: (store, { data }) => {
                const userData = store.readQuery({
                    query: UPDATE_USER
                });

                store.writeQuery({
                    query: UPDATE_USER,
                    data: {
                        reviews: [...userData.users, data.update_users]
                    }
                });
            }
        });*/

        /*
        const auth = await fetch("/api/session", {
          method: "POST",
          body: JSON.stringify(inputValues)
        });
        console.log(auth);*/
  };

  const [ updateUsers, { 
    loading: mutationLoading, 
    error: mutationError 
  }] = useMutation(UPDATE_USER, {
    context: {
      clientName: "users"
    }
  });

  console.log(data)


  return (
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
      <Flex direction={["column", "column", "row"]}>
        <VStack 
        align="flex-start"
        flex="1"
        pl={4}
        pr={12}
        py={2}
        mb={[16, 16, 0]}
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
          <Button
          colorScheme="pink"
          onClick={() => setEditDisabled(!editDisabled)} 
          size="sm"
          variant="outline"
          >
            {editDisabled ? "Edit Details" : "Save Details"}
          </Button>
          <CheckoutForm 
          handleDisabled={() => setEditDisabled(!editDisabled)}
          isDisabled={editDisabled}
          submit={handleUpdateUserSubmission}
          submitText="Submit Details"
          userEmail={user.email}
          />
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
          {loading ? 
          <LoadingSpinner />
          :
          <List w="full">
              {data.orders.map(({ createdAt, name, orderItems, total }) => (
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
                    Total: €{(total/ 100).toFixed(2)}
                  </Text>
                </ListItem>
              ))}
          </List>
          }
        </VStack>
      </Flex>
    </Layout>
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

  return {
    props: {
      user: session?.user ?? null
    }
  };
};

export default Account;