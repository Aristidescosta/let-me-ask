import { Avatar, Box, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface IQuestionProps {
  content: string;
  author: {
    name: string;
    avatar: string | null;
  };
  children?: React.ReactNode;
  isAnswered?: boolean;
  isHighLigted?: boolean;
}

export const Question: React.FC<IQuestionProps> = ({
  content,
  author,
  children,
  isAnswered = false,
  isHighLigted = false,
}) => {

  const BACKGROUND = useColorModeValue('#FFFFFF', '#1A202C')
  const COLOR = useColorModeValue('#29292e', '#ffffffeb')
  const BACKGROUND_ANSWERED = useColorModeValue('#DBDCDD', '#29292e')
  const BACKGROUND_HIGHLIGTED = useColorModeValue('#F4F0FF', '#1A202C')

  return (
    <Box
      bgColor={
        isHighLigted && !isAnswered
          ? BACKGROUND_HIGHLIGTED
          : isAnswered
          ? BACKGROUND_ANSWERED
          : BACKGROUND
      }
      border={isHighLigted && !isAnswered ? "1px solid #835AFD" : "none"}
      borderRadius={8}
      boxShadow={"dark-lg"}
      p={"24px"}
      sx={{
        "& + div": {
          mt: "8px",
        },
      }}
    >
      <Text color={COLOR}>{content}</Text>

      <Box
        as="footer"
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={"24px"}
      >
        <Box display={"flex"} alignItems={"center"}>
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
      {children}
    </Box>
  );
};
