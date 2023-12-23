import {
  Box,
  Button,
  FormControl,
  Image,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React from "react";

import logoImg from "../../../../../public/logo.svg";
import { LetButton } from "../../components/LetButton";
import { RoomCode } from "../../components/RoomCode";
import { useParams } from "react-router-dom";

type IRoomParams = {
  id: string;
}

export const Room: React.FC = () => {
  const { id: roomId } = useParams<IRoomParams>()

  return (
    <Box>
      <Box as="header" padding={24} borderBottom={"1px solid #e2e2e2"}>
        <Box
          maxW={1120}
          margin={"0 auto"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Image src={logoImg} alt="logo do let me ask" maxH={45} />
          <RoomCode code={roomId} />
        </Box>
      </Box>

      <Box as="main" maxW={800} margin={"0 auto"}>
        <Box margin={"32px 0 24px"} display={"flex"} alignItems={"center"}>
          <Text fontSize={24} color={"#29292e"} as="h1" fontWeight={"bold"}>
            Sala React
          </Text>
          <Text
            as="span"
            ml={16}
            bgColor={"#e559f9"}
            borderRadius={9999}
            p={"8px 16px"}
            color={"#FFF"}
            fontWeight={500}
            fontSize={14}
          >
            4 perguntaws
          </Text>
        </Box>

        <FormControl>
          <Textarea
            p={"16px"}
            bgColor={"#fefefe"}
            boxShadow={"0 2px 12px rgba(0, 0, 0, 0.04)"}
            minH={130}
            resize={"vertical"}
            placeholder="O que você quer perguntat?"
          />

          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mt={16}
          >
            <Text as="span" fontSize={14} color={"#737380"} fontWeight={500}>
              Para enviar uma pergunta,{" "}
              <Button
                bgColor={"transparent"}
                color={"#835afd"}
                textDecor={"underline"}
                fontSize={14}
                fontWeight={500}
              >
                faça seu login
              </Button>
            </Text>
            <LetButton title="Enviar pergunta" type="submit" />
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
};
