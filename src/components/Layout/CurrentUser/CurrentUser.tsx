import { Box, Flex, Image, Text } from "@chakra-ui/react";
import * as React from "react";

import { IUser } from "@/pages/index";

interface ICurrentUser {
    user: IUser
}

const CurrentUser: React.FC<ICurrentUser> = ({ user }) => {
    return (
        <Flex
        alignItems="center"
        justifyContent="flex-end"
        >
            <Text
            fontSize="sm"
            mr={[2, 4, 6, 8]}
            >
                {user?.nickname ?? "Logged in as: Guest"}
            </Text>
            <Box
            mr={[2, 4, 6, 8]}
            >
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