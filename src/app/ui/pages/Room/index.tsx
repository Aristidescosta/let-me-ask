import { BiLike, BiComment, BiTrash, BiCheckCircle } from "react-icons/bi";
import React, { useCallback, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  Image,
  Text,
  Textarea,
  Tooltip,
} from "@chakra-ui/react";

import { createQuestion } from "../../../repository/RoomRepository";
import { useToastMessage } from "../../../chakra-ui-api/toast";
import { IQuestionType } from "../../../types/QuestionType";
import { LetButton } from "../../components/LetButton";
import { RoomCode } from "../../components/RoomCode";
import { Question } from "../../components/Question";
import logoImg from "../../../../../public/logo.svg";
import { ROOM_REF } from "../../../utils/constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRoom } from "../../../states/useRoom";
import { useAuth } from "../../../states/useAuth";
import {
  likeQuestion,
  removeLikeQuestion,
} from "../../../repository/QuestionRepository";
import { ModalDelete } from "./ModalDelete";
import { signOut } from "../../../repository/AuthRepository";
import { StorageEnum, deleteData } from "../../../databases/LocalStorageDao";

type IRoomParams = {
  id: string;
};

interface IRoomProps {
  handleCheckQuestionAsAnswered?: (roomId: string, questionId: string) => void;
  handleHighLightAnswered?: (roomId: string, questionId: string) => void;
  handleLikeQuestion?: (roomId: string, questionId: string) => void;
  handleEndRoom?: (roomId: string) => Promise<void>;
  handleRemoveLikeQuestion?: (
    roomId: string,
    questionId: string,
    likeId: string
  ) => void;
  handleDeleteQuestion?: (
    roomId: string,
    questionId: string
  ) => Promise<string>;
  isEndedRoom?: boolean;
  isDeleting?: boolean;
  isAdmin?: boolean;
}

export const Room: React.FC<IRoomProps> = ({
  handleCheckQuestionAsAnswered,
  handleHighLightAnswered,
  handleDeleteQuestion,
  handleEndRoom,
  isEndedRoom,
  isDeleting,
  isAdmin,
}) => {
  const { id: roomId } = useParams<IRoomParams>();

  const { toastMessage, ToastStatus } = useToastMessage();
  const { questions, titleRoom } = useRoom(roomId);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSignOut, setIsLoadingSignOut] = useState(false);
  const [question, setQuestion] = useState({
    content: "",
    id: "",
  });

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

  const handleLikeQuestion = (roomId: string, questionId: string) => {
    const PATH = `${ROOM_REF}/${roomId}/questions/${questionId}/likes`;
    if (user) {
      likeQuestion(PATH, user.id);
    }
  };

  const onHandleHighLightAnswered = (questionId: string) => {
    if (roomId && handleHighLightAnswered) {
      handleHighLightAnswered(roomId, questionId);
    }
  };

  const onHandleCheckQuestionAsAnswered = (questionId: string) => {
    if (roomId && handleCheckQuestionAsAnswered) {
      handleCheckQuestionAsAnswered(roomId, questionId);
    }
  };

  const handleRemoveLikeQuestion = (
    roomId: string,
    questionId: string,
    likeId: string
  ) => {
    const PATH = `${ROOM_REF}/${roomId}/questions/${questionId}/likes/${likeId}`;
    /* setIsUpdating(true); */
    removeLikeQuestion(PATH).catch((error) => {
      console.error(error);
      toastMessage({
        title: "Tivemos um erro interno, tente novamente!",
        position: "top-right",
        statusToast: ToastStatus.ERROR,
      });
    });
    /* .finally(() => setIsUpdating(false)); */
  };

  const onDeleteQuestion = (questionId: string) => {
    if (handleDeleteQuestion && roomId) {
      handleDeleteQuestion?.(roomId, questionId)
        .then((response) => {
          toastMessage({
            title: response,
            position: "top-right",
            statusToast: ToastStatus.SUCCESS,
          });
          onCloseModalDelete();
        })
        .catch((error) => {
          console.error(error);
          toastMessage({
            title: "Tivemos um erro interno, tente novamente!",
            position: "top-right",
            statusToast: ToastStatus.ERROR,
          });
        });
    }
  };

  const onOpenModalDelete = (content: string, id: string) => {
    setIsOpenModal(true);
    setQuestion({
      content: content,
      id: id,
    });
  };

  const onCloseModalDelete = () => {
    setIsOpenModal(false);
    setQuestion({
      content: "",
      id: "",
    });
  };

  const onHandleLikeQuestion = (
    questionId: string,
    likeId: string | undefined
  ) => {
    if (roomId) {
      if (likeId) {
        handleRemoveLikeQuestion(roomId, questionId, likeId);
      } else {
        handleLikeQuestion(roomId, questionId);
      }
    }
  };

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
              title: error.message.message,
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
        setIsLoading(false);
      }
    }
  }, [newQuestion, user, roomId]);

  const handleSignOut = () => {
    setIsLoadingSignOut(true);
    signOut()
      .then((response) => {
        console.log(response);
        if (response) {
          deleteData(StorageEnum.UserStorage);
          window.location.reload()
        }
      })
      .catch((error) => {
        toastMessage({
          title: error.message.message,
          statusToast: ToastStatus.ERROR,
          position: "top-right",
        });
      })
      .finally(() => setIsLoadingSignOut(false));
  };

  return (
    <Box>
      <Box as="header" padding={24} borderBottom={"1px solid #e2e2e2"}>
        <Box maxW={1120} margin={"0 auto"}>
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={"center"}
            mb={4}
            gap={4}
          >
            {user && (
              <Button
                variant={"ghost"}
                aria-label="Terminar secção"
                rightIcon={<CiLogout />}
                onClick={handleSignOut}
                isLoading={isLoadingSignOut}
              >
                Sair
              </Button>
            )}

            <IconButton
              aria-label="Trocar de tema"
              isRound={true}
              variant={"ghost"}
              fontSize="20px"
              icon={<MdDarkMode />}
            />
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Image src={logoImg} alt="logo do let me ask" maxH={45} />
            <Box display={"flex"} alignItems={"center"} gap={4}>
              <RoomCode
                code={roomId}
                copyRooCodeToClipboard={copyRooCodeToClipboard}
              />
              {isAdmin && (
                <LetButton
                  onClick={() => handleEndRoom?.(roomId ?? "")}
                  isLoading={isEndedRoom}
                  title="Encerrar a sala"
                  isOutlined={isAdmin}
                />
              )}
            </Box>
          </Box>
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

        <Box mt={"32px"} display={"flex"} flexDir={"column"}>
          {questions.map((question) => (
            <Question
              key={question.id}
              author={question.author}
              content={question.content}
              isAnswered={question.isAnswered}
              isHighLigted={question.isHighLigted}
            >
              <Box
                display={"flex"}
                gap={2}
                alignItems={"center"}
                justifyContent={"flex-end"}
              >
                {isAdmin ? (
                  <>
                    {!question.isAnswered && (
                      <>
                        <Tooltip label="Marcar pergunta como respondida">
                          <IconButton
                            isRound={true}
                            variant="solid"
                            aria-label="Marcar pergunta como respondida"
                            fontSize="20px"
                            icon={<BiCheckCircle />}
                            onClick={() =>
                              onHandleCheckQuestionAsAnswered(question.id)
                            }
                          />
                        </Tooltip>

                        <Tooltip label="Dar destaque a pergunta">
                          <IconButton
                            icon={<BiComment />}
                            aria-label="Dar destaque a pergunta"
                            variant="outline"
                            onClick={() =>
                              onHandleHighLightAnswered(question.id)
                            }
                          />
                        </Tooltip>
                      </>
                    )}

                    <Tooltip label="Eliminar pergunta">
                      <IconButton
                        icon={<BiTrash />}
                        aria-label="Eliminar pergunta"
                        variant="outline"
                        onClick={() =>
                          onOpenModalDelete(question.content, question.id)
                        }
                      />
                    </Tooltip>
                  </>
                ) : (
                  !question.isAnswered && (
                    <Tooltip label="Dar like na pergunta">
                      <Button
                        rightIcon={<BiLike />}
                        aria-label="Dar like na pergunta"
                        onClick={() =>
                          onHandleLikeQuestion(question.id, question.likeId)
                        }
                      >
                        {question.likeCount > 0 && question.likeCount}
                      </Button>
                    </Tooltip>
                  )
                )}
              </Box>
            </Question>
          ))}
        </Box>
      </Box>

      {isOpenModal && (
        <ModalDelete
          question={question}
          isOpen={isOpenModal}
          onClose={onCloseModalDelete}
          handleDeleteQuestion={onDeleteQuestion}
          isDeleting={isDeleting ?? false}
        />
      )}
    </Box>
  );
};
