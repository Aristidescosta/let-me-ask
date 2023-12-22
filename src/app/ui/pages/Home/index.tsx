import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaGoogle } from "react-icons/fa";

import illustration from "../../../../../public/illustration.svg";
import logo from "../../../../../public/logo.svg";
import { LetButton } from "../../components/LetButton";

export const Home: React.FC = () => {
  return (
    <Box display={"flex"} h={"100vh"} alignItems={"stretch"}>
      <Box
        as="aside"
        bgColor={"#835afc"}
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        flex={7}
        color={"#FFF"}
        padding={"120px 88px"}
      >
        <Image
          src={illustration}
          alt="Ilustração simbolizando perguntas e respostas"
          maxW={320}
        />
        <Text
          as={"strong"}
          fontSize={36}
          fontWeight={700}
          lineHeight={"42px"}
          mt={16}
        >
          Crie salas e Q&amp;A ao-vivo
        </Text>
        <Text>Tire as dúvidas da sua audiência em tempo-real</Text>
      </Box>

      <Box
        as="main"
        flex={8}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        padding="0 32px"
        flexDir={"column"}
      >
        <Box
          display={"flex"}
          alignItems={"stretch"}
          textAlign={"center"}
          flexDir={"column"}
          maxW={320}
          width={"full"}
          gap={4}
        >
          <Image src={logo} alt="Letmeask" alignSelf={"center"} />
          <Button
            aria-label="Botão para entrar com a google"
            leftIcon={<FaGoogle />}
            colorScheme="red"
          >
            Crie sua sala com o Google
          </Button>

          <Text>Ou entre em uma sala</Text>
          <FormControl>
            <FormLabel>Código da sala</FormLabel>
            <Input placeholder="Código da sala" />
            <LetButton title="Entrar na sala" mt={4}/>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};
