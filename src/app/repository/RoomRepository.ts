import { createRoomDAO } from "../databases/RoomDAO";
import { IRoomType } from "../types/RoomType";

export const createRoom = (roomReference: string, room: IRoomType): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      if (room.title.trim() === "") {
        resolve("Adicione um título a sala")
      } else {
        createRoomDAO(roomReference, room)
          .then(result => {
            if (typeof result === "string") {
              resolve(result)
            }
            resolve("Sala criada")
          })
          .catch(error => reject(error))
      }
    } catch (error) {
      reject
    }
  })
}