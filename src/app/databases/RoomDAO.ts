import { DatabaseReference, push } from "firebase/database"
import { getDatabaseRef, } from "../firebase/database"
import { IRoomType } from "../types/RoomType";

export const createRoomDAO = (roomReference: string, room: IRoomType): Promise<DatabaseReference | string> => {
  return new Promise((resolve, reject) => {
    try {
      const ROOM_REF = getDatabaseRef(roomReference);
      console.log("Cheguei aqui")

      push(ROOM_REF, room)
        .then((response => {
          console.log("teste")
          resolve(response)
        }))
        .catch((reason) => {
          console.log("erro")
          resolve(reason.message)
        })
    } catch (error) {
      reject(error);
    }
  });
};