import { DataSnapshot, child, get, push } from "firebase/database"
import { getDatabaseRef, } from "../firebase/database"
import { IRoomType } from "../types/RoomType";

export const createRoomDAO = (roomReference: string, room: IRoomType): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    try {
      const ROOM_REF = getDatabaseRef(roomReference);
      console.log("Cheguei aqui")

      push(ROOM_REF, room)
        .then((response => {
          resolve(response.key)
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


export const joinRoomDAO = (roomReference: string, roomCode: string): Promise<DataSnapshot | string> => {
  return new Promise((resolve, reject) => {
    try {
      const ROOM_REF = getDatabaseRef()
      get(child(ROOM_REF, `/${roomReference}/${roomCode}`))
        .then((snapshots) => {
          if (snapshots.exists()) {
            console.log(snapshots)
            resolve(snapshots)
          } else {
            reject({ message: "Sem dados" })
          }
        })
    } catch (error) {
      reject
    }
  })
}