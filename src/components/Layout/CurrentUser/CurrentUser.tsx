import { Box, Flex, Image, Text } from "@chakra-ui/react";
import * as React from "react";

import { IUser } from "@/components/Layout/Nav/Nav";

type Justify = "flex-start" | "flex-end" | "center";

interface ICurrentUser {
    justify: Justify;
    user: IUser;
    userLoading?: boolean
}

const CurrentUser: React.FC<ICurrentUser> = ({ justify, user, userLoading }) => {
    return (
        <Flex 
        alignItems="center"
        justify={justify}
        flex="1"
        >
            {userLoading ? 
            <Box>
                Loading user
            </Box>
            :
            <>
            <Text>
                {user?.nickname ?? "Guest"}
            </Text>
            <Box ml={4}>
                {user?.picture ?
                <Image 
                alt="user profile pic"
                boxSize={["20px", "20px", "20px", "30px"]}
                src={user.picture}
                />
                : null}
            </Box>
            </>
            }
        </Flex>
    );
};

export default CurrentUser;