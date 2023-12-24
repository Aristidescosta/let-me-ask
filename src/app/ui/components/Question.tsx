import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

interface IQuestionProps {
  content: string;
  author: {
    name: string;
    avatar: string | null;
  };
}

export const Question: React.FC<IQuestionProps> = ({ content, author }) => {
  return (
    <Box
      bgColor={"#fefefe"}
      borderRadius={8}
      boxShadow={"-7px 8px 32px 11px rgba(0,0,0,0.1)"}
      p={"24px"}
      sx={{
        "& + div": {
          mt: "8px",
        },
      }}
    >
      <Text color={"#29292e"}>{content}</Text>

      <Box
        as="footer"
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={"24px"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
        >
          <Avatar
            src={author.avatar ? author.avatar : undefined}
            name={author.name}
          />
          <Text
            as={"span"}
            ml={8}
            color={"#737380"}
            fontWeight={500}
            fontSize={14}
          >
            {author.name}
          </Text>
          <Box></Box>
        </Box>
      </Box>
    </Box>
  );
};
