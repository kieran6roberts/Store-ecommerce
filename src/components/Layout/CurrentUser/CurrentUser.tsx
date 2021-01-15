import { Box, Flex, Image, Text } from "@chakra-ui/react";
import * as React from "react";

import { IUser } from "@/pages/index";

interface ICurrentUser {
    user: IUser
}

const CurrentUser: React.FC<ICurrentUser> = ({ user }) => {
    return (
        <Flex alignItems="center">
            <Text>
                {user?.nickname ?? "Logged in as: Guest"}
            </Text>
            <Box>
                {user?.picture ?
                <Image 
                alt="user profile pic"
                boxSize={["20px", "20px", "20px", "30px"]}
                src={user.picture}
                />
                : null}
            </Box>
        </Flex>
    );
};

export default CurrentUser;