import React from "react";

import { createRoom } from "../../../repository/RoomRepository";
import { useToastMessage } from "../../../chakra-ui-api/toast";
import { ROOM_REF } from "../../../utils/constants";
import { IRoomType } from "../../../types/RoomType";
import { BaseLayoutPage } from "../BaseLayoutPage";

export const NewRoom: React.FC = () => {
  const { toastMessage, ToastStatus } = useToastMessage();
  const handleCreateRoom = (room: IRoomType): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        createRoom(ROOM_REF, room)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject({ message: error.message });
          });
      } catch (error) {
        console.log("ERRO: " + error);
        toastMessage({
          title: "Ops! Tivemos um pequeno erro, tente novamente!",
          statusToast: ToastStatus.ERROR,
          position: "top-right",
        });
      }
    });
  };

  return <BaseLayoutPage handleCreateRoom={handleCreateRoom} />;
};
