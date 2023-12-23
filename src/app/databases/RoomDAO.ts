import { UserCredential } from "firebase/auth"
import { sigInWithGoogle } from "../firebase/auth"

export const createRoomDAO = (): Promise<UserCredential> => {
  return new Promise((resolve, reject) => {
    try {
      sigInWithGoogle()
        .then(response => resolve(response))
        .catch(error => reject({ message: error }))
    } catch (error) {
      reject({ message: error })
    }
  })
}