import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { authApp } from ".."

export const sigInWithGoogle = async () => {
  return new Promise((resolve, reject) => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(authApp, provider)
      .then(result => {
        GoogleAuthProvider.credentialFromResult(result);
        resolve(result.user)
      })
      .catch(error => {
        GoogleAuthProvider.credentialFromError(error)
        reject(error.message)
      })
  })
}