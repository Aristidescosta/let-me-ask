import { SlTrash } from "react-icons/sl";
import {
  Button,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface IModalDeleteProps {
  question: {
    content: string;
    id: string;
  };
  isOpen: boolean;
  onClose: () => void;
  handleDeleteQuestion: (questionId: string) => void;
  isDeleting: boolean;
}

export const ModalDelete: React.FC<IModalDeleteProps> = ({
  question,
  isOpen,
  isDeleting,
  onClose,
  handleDeleteQuestion,
}) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        bg="none"
        backdropFilter="auto"
        backdropInvert="80%"
        backdropBlur="2px"
      />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDir={"column"}
        >
          <Icon as={SlTrash} boxSize={20} color={"red"} />
          <Heading as="h5" size="md">
            Excluir pergunta!
          </Heading>
          <Text color={"#29292e"}>{question.content}</Text>
        </ModalBody>
        <ModalFooter
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={4}
        >
          <Button onClick={onClose}>Cancelar</Button>
          <Button
            isLoading={isDeleting}
            onClick={() => handleDeleteQuestion(question.id)}
            colorScheme="red"
          >
            Eliminar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
