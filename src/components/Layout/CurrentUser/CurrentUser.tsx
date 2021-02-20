import { Box, Flex, Image, Text } from "@chakra-ui/react";
import * as React from "react";

import { IUser } from "@/pages/index";

interface ICurrentUser {
    user: IUser;
    userLoading: boolean
}

const CurrentUser: React.FC<ICurrentUser> = ({ user, userLoading }) => {
    return (
        <Flex 
        alignItems="center"
        justify="flex-end"
        flex="1"
        >
            {userLoading ? 
            <Box>
                ...
            </Box>
            :
            <>
            <Text>
                {user?.nickname ?? "User: Guest"}
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