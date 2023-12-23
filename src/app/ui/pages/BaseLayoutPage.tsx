import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
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

import illustration from "../../../../public/illustration.svg";
import logo from "../../../../public/logo.svg";

import { useNavigateTo } from "../../react-router-dom";
import { LetButton } from "../components/LetButton";
import { createRoom } from "../../repository/RoomRepository";
import { useAuth } from "../../states/useAuth";

interface IBaseLayoutPageProps {
  isHome?: boolean;
}

export const BaseLayoutPage: React.FC<IBaseLayoutPageProps> = ({ isHome }) => {
  const TITLE_ROOM = isHome ? "Código da sala" : "Nome da sala";
  const TITLE_BUTTOM = isHome ? "Entrar na sala" : "Criar sala";

  const { navigateTo } = useNavigateTo();
  const { user, setUser } = useAuth();

  const handleCreateRoom = () => {
    if (!user) {
      createRoom().then((result) => {
        const { displayName, photoURL, uid } = result;

        if (!displayName || !uid) {
          throw new Error("Falta informação da conta Google");
        }
        setUser({
          id: uid,
          avatar: photoURL,
          name: displayName,
        });
      });
    }
    navigateTo("/rooms/new");
  };

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
            <>
              <Text as={"h1"} fontWeight={"bold"} fontSize={24}>
                {user?.name}
              </Text>
              <Text as={"h2"} fontWeight={"bold"} fontSize={24}>
                Crie uma nova sala
              </Text>
            </>
          ) : (
            <>
              <Button
                aria-label="Botão para entrar com a google"
                leftIcon={<FaGoogle />}
                colorScheme="red"
                onClick={handleCreateRoom}
              >
                Crie sua sala com o Google
              </Button>

              <Text>Ou entre em uma sala</Text>
            </>
          )}
          <FormControl>
            <FormLabel>{TITLE_ROOM}</FormLabel>
            <Input placeholder={TITLE_ROOM} />
            <LetButton title={TITLE_BUTTOM} mt={4} />
          </FormControl>
          {!isHome && (
            <Text>
              Quer entrar em uma sala existente?{" "}
              <Link to={"/"} color={"#e559f9"}>
                Clique aqui
              </Link>
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};
