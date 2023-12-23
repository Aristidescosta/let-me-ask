import React from "react";
import { BaseLayoutPage } from "../BaseLayoutPage";
import { createRoom } from "../../../repository/RoomRepository";
import { ROOM_REF } from "../../../utils/constants";
import { IRoomType } from "../../../types/RoomType";

export const NewRoom: React.FC = () => {
  const handleCreateRoom = (room: IRoomType): Promise<string> => {
    return new Promise((resolve, reject) => {
      createRoom(ROOM_REF, room)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject({ message: error.message });
        });
    });
  };

  return <BaseLayoutPage handleCreateRoom={handleCreateRoom} />;
};
