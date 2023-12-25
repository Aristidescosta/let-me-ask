import { User } from "firebase/auth"

import { logoutDAO, signIn } from "../databases/AuthDAO"

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

export const signOut = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      logoutDAO()
        .then(resolve)
        .catch(error => reject({ message: error }))
    } catch (error) {
      reject({ message: error })
    }
  })
}