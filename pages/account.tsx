import { useQuery } from "@apollo/client";
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
import auth0 from "@/lib/auth";
import { GET_USER_ORDERS } from "@/queries/orders";
import { formatPrice } from "@/utils/formatPrice";
import { generateItemKey } from "@/utils/generateItemKey";

export interface IAccountInput {
    [key: string]: string;
}

interface IPreviousOrders {
    createdAt: string;
    name:string;
    total: number;
}

const Account: NextPage<{ user: IUser }> = ({ user }) => {
  const [ editDisabled, setEditDisabled ] = React.useState<boolean>(true);

  console.log(user)
  const { data, loading } = useQuery(GET_USER_ORDERS, {
    variables: {
      email: user.email
    }
  });

  const handleUpdateUserSubmission = async (inputs: { [key:string]: string }) => {
      const auth = await fetch("/api/session", {
        method: "POST",
        body: JSON.stringify(inputs),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json());

      const { update_users: { returning } } = auth.data;
      
      console.log(returning);

      setEditDisabled(true);
  };


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
        flex="2"
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
          <Box 
          bg={editDisabled ? useColorModeValue("gray.50", "gray.700")  : "none" }
          borderRadius="md"
          p={4}
          >
            <CheckoutForm 
            handleDisabled={() => setEditDisabled(!editDisabled)}
            isDisabled={editDisabled}
            submit={handleUpdateUserSubmission}
            submitText="Submit Details"
            userEmail={user.email}
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
          {loading ? 
          <LoadingSpinner />
          :
          <List w="full">
              {data.orders.map(({ createdAt, name, total }: IPreviousOrders) => (
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