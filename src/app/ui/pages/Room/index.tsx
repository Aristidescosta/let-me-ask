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
import { useAuth } from "../../../states/useAuth";
import { Link, useParams } from "react-router-dom";
import {
  createQuestion
} from "../../../repository/RoomRepository";
import { Question } from "../../components/Question";
import { useRoom } from "../../../states/useRoom";

type IRoomParams = {
  id: string;
};



export const Room: React.FC = () => {
  const { id: roomId } = useParams<IRoomParams>();

  
  const { toastMessage, ToastStatus } = useToastMessage();
  const { user } = useAuth();
  const { questions, titleRoom } = useRoom(roomId)
 
  const [newQuestion, setNewQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
              {questions.length} perguntas
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
            placeholder="O que você quer perguntar?"
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
                  <Link to={"/"}>faça seu login</Link>
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

        <Box mt={"32px"}>
          {questions.map((question) => (
            <Question
              key={question.id}
              author={question.author}
              content={question.content}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
