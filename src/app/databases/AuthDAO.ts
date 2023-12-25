import { UserCredential } from "firebase/auth"

import { logout, sigInWithGoogle } from "../firebase/auth"

export const signIn = (): Promise<UserCredential> => {
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


export const logoutDAO = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      logout()
        .then(() => {
          resolve(true)
        })
        .catch(error => reject({ message: error }))
    } catch (error) {
      reject({ message: error })
    }
  })
}