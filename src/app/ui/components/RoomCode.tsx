import { Box, Button, Image, Text } from "@chakra-ui/react";
import React from "react";
import copyImage from "../../../../public/copy.svg";

interface IRoomCodeProps {
  code: string | undefined;
}

export const RoomCode: React.FC<IRoomCodeProps> = ({ code }) => {
  const copyRooCodeToClipboard = () => {
    if (code) navigator.clipboard.writeText(code);
  };

  return (
    <Button
      h={"40px"}
      borderRadius={"8px"}
      overflow={"hidden"}
      bgColor={"#fff"}
      border={"1px solid #835AFD"}
      p={0}
      display={"flex"}
      onClick={copyRooCodeToClipboard}
    >
      <Box
        bgColor={"#835AFD"}
        p={"0 12px"}
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        h={"full"}
      >
        <Image w={"full"} src={copyImage} alt="Copy room code" />
      </Box>

      <Text
        as="span"
        display={"block"}
        alignSelf={"center"}
        flex={1}
        p={"0 16px 0 12px"}
        w={"240px"}
        fontSize={14}
        fontWeight={500}
      >
        Sala #{code}
      </Text>
    </Button>
  );
};
