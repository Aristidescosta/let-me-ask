import React, { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Image,
  Text,
  Textarea,
} from "@chakra-ui/react";

import { useToastMessage } from "../../../chakra-ui-api/toast";
import { IQuestionType } from "../../../types/QuestionType";
import { LetButton } from "../../components/LetButton";
import logoImg from "../../../../../public/logo.svg";
import { RoomCode } from "../../components/RoomCode";
import { ROOM_REF } from "../../../utils/constants";
import { useAuth } from "../../../states/useAuth";
import { useParams } from "react-router-dom";
import {
  createQuestion,
  getAllQuestions,
} from "../../../repository/RoomRepository";

type IRoomParams = {
  id: string;
};

type IFirebaseQuestions = Record<string, IQuestionType>;

type TQuestionProps = IQuestionType & {
  id: string;
};

export const Room: React.FC = () => {
  const { id: roomId } = useParams<IRoomParams>();

  const [newQuestion, setNewQuestion] = useState("");
  const { toastMessage, ToastStatus } = useToastMessage();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [titleRoom, setTitleRoom] = useState("");

  const [questions, setQuestions] = useState<TQuestionProps[]>([]);

  const copyRooCodeToClipboard = useCallback(() => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
      toastMessage({
        title: "Código da sala cópiado!",
        statusToast: ToastStatus.SUCCESS,
        position: "top-right",
      });
    }
  }, [roomId]);

  const handleSendQuestion = useCallback(() => {
    if (newQuestion.trim() === "") {
      toastMessage({
        title: "Adicione a pergunta",
        position: "top-right",
        statusToast: ToastStatus.INFO,
      });
    } else if (!user) {
      toastMessage({
        title: "Tens de fazer login para continuar",
        position: "top-right",
        statusToast: ToastStatus.WARNING,
      });
    } else {
      try {
        setIsLoading(true);
        const question: IQuestionType = {
          content: newQuestion,
          author: {
            name: user.name,
            avatar: user.avatar,
          },
          isHighLigted: false,
          isAnswered: false,
        };
        createQuestion(`rooms/${roomId}/questions`, question)
          .then(() => {
            toastMessage({
              title: "Pergunta criada com sucesso",
              position: "top-right",
              statusToast: ToastStatus.SUCCESS,
            });
            setNewQuestion("");
          })
          .catch((error) => {
            toastMessage({
              title:
                error instanceof Error ? error.message : "Erro desconhecido",
              statusToast: ToastStatus.WARNING,
            });
          })
          .finally(() => setIsLoading(false));
      } catch (error) {
        toastMessage({
          title: error instanceof Error ? error.message : "Erro desconhecido",
          statusToast: ToastStatus.WARNING,
        });
        setIsLoading(false);
      }
    }
  }, [newQuestion, user, roomId]);

  useEffect(() => {
    if (roomId) {
      getAllQuestions(ROOM_REF, roomId).then((response) => {
        if (typeof response === "string") console.log(response);
        else {
          const databaseRoom = response.val();

          const firebaseQuestions: IFirebaseQuestions =
            databaseRoom.questions ?? {};

          const parseQuestions = Object.entries(firebaseQuestions).map(
            ([key, question]) => {
              return {
                id: key,
                author: question.author,
                content: question.content,
                isAnswered: question.isAnswered,
                isHighLigted: question.isHighLigted,
              };
            }
          );

          setQuestions(parseQuestions);
          setTitleRoom(databaseRoom.title);
        }
      });
    }
  }, [roomId]);

  console.log(questions);

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
          <RoomCode
            code={roomId}
            copyRooCodeToClipboard={copyRooCodeToClipboard}
          />
        </Box>
      </Box>

      <Box as="main" maxW={800} margin={"0 auto"}>
        <Box margin={"32px 0 24px"} display={"flex"} alignItems={"center"}>
          <Text fontSize={24} color={"#29292e"} as="h1" fontWeight={"bold"}>
            Sala {titleRoom}
          </Text>
          {questions.length > 0 && (
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
          )}
        </Box>

        <FormControl>
          <Textarea
            p={"16px"}
            bgColor={"#fefefe"}
            boxShadow={"0 2px 12px rgba(0, 0, 0, 0.04)"}
            minH={130}
            resize={"vertical"}
            placeholder="O que você quer perguntat?"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mt={16}
          >
            {!user ? (
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
            ) : (
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={5}
              >
                <Avatar
                  src={user.avatar ? user.avatar : undefined}
                  name={user.name}
                />
                <Text
                  color="#29292e"
                  fontWeight={"500"}
                  fontSize={14}
                  as="span"
                >
                  {user.name}
                </Text>
              </Box>
            )}
            <LetButton
              disabled={!user}
              onClick={handleSendQuestion}
              title="Enviar pergunta"
              type="submit"
              isLoading={isLoading}
            />
          </Box>
        </FormControl>

        {questions.map((question) => (
          <Text key={question.id}>{question.content}</Text>
        ))}
      </Box>
    </Box>
  );
};
