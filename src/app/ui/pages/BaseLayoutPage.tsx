import React, { FormEvent, useState } from "react";
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
  useMediaQuery,
} from "@chakra-ui/react";

import illustration from "../../../../public/illustration.svg";
import logo from "../../../../public/logo.svg";

import { useToastMessage } from "../../chakra-ui-api/toast";
import { useNavigateTo } from "../../react-router-dom";
import { LetButton } from "../components/LetButton";
import { IRoomType } from "../../types/RoomType";
import { useAuth } from "../../states/useAuth";
import { RxEnter } from "react-icons/rx";

interface IBaseLayoutPageProps {
  isHome?: boolean;
  handleSignInWithGoogle?: () => void;
  handleCreateRoom?: (room: IRoomType) => Promise<string>;
  handleJoinRoom?: (roomCode: string) => Promise<string | IRoomType>;
}

export const BaseLayoutPage: React.FC<IBaseLayoutPageProps> = ({
  handleSignInWithGoogle,
  handleCreateRoom,
  handleJoinRoom,
  isHome,
}) => {
  const TITLE_ROOM = isHome ? "Código da sala" : "Nome da sala";
  const TITLE_BUTTOM = isHome ? "Entrar na sala" : "Criar sala";

  const { user, setUserAdmin: setUserAdmin } = useAuth();

  const [isLessThan767] = useMediaQuery("(max-width: 767px)");

  const { toastMessage, ToastStatus } = useToastMessage();

  const [newRoom, setNewRoom] = useState("");
  /* const [roomCode, setRoomCode] = useState("") */
  const [isLoading, setIsLoading] = useState(false);
  const { navigateTo } = useNavigateTo();

  const onCreateRoom = (event: FormEvent) => {
    try {
      event.preventDefault();
      if (user) {
        setIsLoading(true);
        handleCreateRoom?.({
          title: newRoom,
          authorId: user.id,
          questions: [],
        })
          .then((response) => {
            if (response.includes("sala")) {
              toastMessage({
                title: response,
                statusToast: ToastStatus.INFO,
                position: "top-right",
              });
            } else {
              setUserAdmin(true);
              navigateTo(`/rooms/${response}`);
            }
          })
          .catch((error) => {
            const ERROR_MESSAGE =
              typeof error.message === "object"
                ? error.message.message
                : error.message;

            toastMessage({
              title: ERROR_MESSAGE,
              statusToast: ToastStatus.ERROR,
              position: "top-right",
            });
          })
          .finally(() => setIsLoading(false));
      }
    } catch (error) {
      console.log("ERRO: " + error);
      toastMessage({
        title: "Ops! Tivemos um pequeno erro, tente novamente!",
        statusToast: ToastStatus.ERROR,
        position: "top-right",
      });
    }
  };

  const onJoinRoom = () => {
    try {
      setIsLoading(true);
      handleJoinRoom?.(newRoom)
        .then((response) => {
          if (typeof response === "string") {
            toastMessage({
              title: response,
              statusToast: ToastStatus.INFO,
              position: "top-right",
            });
          } else if (response.authorId === user?.id) {
            setUserAdmin(true);
            navigateTo(`/admin/rooms/${newRoom}`);
          } else {
            navigateTo(`/rooms/${newRoom}`);
            setUserAdmin(false);
          }
        })
        .catch((error) => {
          const ERROR_MESSAGE =
            typeof error.message === "object"
              ? error.message.message
              : error.message;

          toastMessage({
            title: ERROR_MESSAGE,
            statusToast: ToastStatus.ERROR,
            position: "top-right",
          });
        })
        .finally(() => setIsLoading(false));
    } catch (error) {
      console.log("ERRO: " + error);
      toastMessage({
        title: "Ops! Tivemos um pequeno erro, tente novamente!",
        statusToast: ToastStatus.ERROR,
        position: "top-right",
      });
    }
  };

  return (
    <Box
      display={"flex"}
      h={"100vh"}
      alignItems={"stretch"}
      flexDir={isLessThan767 ? "column" : "row"}
      gap={isLessThan767 ? 4 : 0}
    >
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
          /* maxW={320} */
        />
        <Text
          as={"strong"}
          fontSize={36}
          fontWeight={700}
          lineHeight={"42px"}
          mt={16}
        >
          Toda a pergunta tem uma resposta
        </Text>
        <Text>Aprenda e compartilhe conhecimento com outras pessoas</Text>
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
          mb={isLessThan767 ? 12 : 0}
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
            <LetButton
              isLoading={isLoading}
              title={TITLE_BUTTOM}
              mt={4}
              onClick={isHome ? onJoinRoom : onCreateRoom}
              leftIcon={<RxEnter />}
            />
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
