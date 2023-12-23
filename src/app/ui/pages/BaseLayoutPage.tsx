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
import React, { FormEvent, useState } from "react";

import illustration from "../../../../public/illustration.svg";
import logo from "../../../../public/logo.svg";

import { LetButton } from "../components/LetButton";
import { useAuth } from "../../states/useAuth";
import { createRoom } from "../../repository/RoomRepository";
import { useToastMessage } from "../../chakra-ui-api/toast";

interface IBaseLayoutPageProps {
  isHome?: boolean;
  handleSignInWithGoogle?: () => void;
}

export const BaseLayoutPage: React.FC<IBaseLayoutPageProps> = ({
  isHome,
  handleSignInWithGoogle,
}) => {
  const TITLE_ROOM = isHome ? "Código da sala" : "Nome da sala";
  const TITLE_BUTTOM = isHome ? "Entrar na sala" : "Criar sala";

  const { user } = useAuth();

  const { toastMessage, ToastStatus } = useToastMessage();

  const [newRoom, setNewRoom] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateRoom = (event: FormEvent) => {
    event.preventDefault();
    if (user) {
      setIsLoading(true);
      createRoom("rooms", {
        title: newRoom,
        authorId: user.id,
        questions: [],
      })
        .then((response) => {
          toastMessage({
            title: response,
            statusToast: response.includes("criada") ? ToastStatus.SUCCESS : ToastStatus.INFO,
            position: "top-right",
          });
        })
        .catch((error) => {
          console.log(error)
          toastMessage({
            title: "Tivemos um erro interno, tente novamente",
            statusToast: ToastStatus.SUCCESS,
            position: "top-right",
          });
        })
        .finally(() => setIsLoading(false))
    }
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
              <Text as={"h1"} fontSize={24}>
                {user?.name}
              </Text>
              <Text as={"h2"} fontSize={24}>
                Crie uma nova sala
              </Text>
            </>
          ) : (
            <>
              <Button
                aria-label="Botão para entrar com a google"
                leftIcon={<FaGoogle />}
                colorScheme="red"
                onClick={handleSignInWithGoogle}
              >
                Crie sua sala com o Google
              </Button>

              <Text>Ou entre em uma sala</Text>
            </>
          )}
          <FormControl>
            <FormLabel>{TITLE_ROOM}</FormLabel>
            <Input
              placeholder={TITLE_ROOM}
              onChange={(e) => setNewRoom(e.target.value)}
              value={newRoom}
            />
            <LetButton isLoading={isLoading} title={TITLE_BUTTOM} mt={4} onClick={handleCreateRoom} />
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
