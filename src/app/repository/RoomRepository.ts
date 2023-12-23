import { User } from "firebase/auth"

import { createRoomDAO } from "../databases/RoomDAO"

export const createRoom = (): Promise<User> => {
  return new Promise((resolve, reject) => {
    try {
      createRoomDAO()
        .then(response => resolve(response.user))
        .catch(error => reject({ message: error }))
    } catch (error) {
      reject({ message: error })
    }
  })
}