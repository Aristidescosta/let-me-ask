import { User } from "firebase/auth"

import { signIn } from "../databases/AuthDAO"

export const signInWithGoogle = (): Promise<User> => {
  return new Promise((resolve, reject) => {
    try {
      signIn()
        .then(response => resolve(response.user))
        .catch(error => reject({ message: error }))
    } catch (error) {
      reject({ message: error })
    }
  })
}