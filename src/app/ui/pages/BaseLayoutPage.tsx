import { FaGoogle } from "react-icons/fa";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import React from "react";

import illustration from "../../../../public/illustration.svg";
import logo from "../../../../public/logo.svg";

import { LetButton } from "../components/LetButton";

interface IBaseLayoutPageProps {
  isHome?: boolean;
}

export const BaseLayoutPage: React.FC<IBaseLayoutPageProps> = ({ isHome }) => {
  const TITLE_ROOM = isHome ? "Código da sala" : "Nome da sala";

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
          {!isHome ? (
            <Text as={"h2"} fontSize={24} margin={"64px 0 24px"}>
              Crie uma nova sala
            </Text>
          ) : (
            <>
              <Button
                aria-label="Botão para entrar com a google"
                leftIcon={<FaGoogle />}
                colorScheme="red"
              >
                Crie sua sala com o Google
              </Button>

              <Text>Ou entre em uma sala</Text>
            </>
          )}
          <FormControl>
            <FormLabel>{TITLE_ROOM}</FormLabel>
            <Input placeholder={TITLE_ROOM} />
            <LetButton title="Entrar na sala" mt={4} />
          </FormControl>
          {!isHome && (
            <Text>
              Quer entrar em uma sala existente?{" "}
              <Link color={"#e559f9"}>Clique aqui</Link>
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};
