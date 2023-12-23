import { GoogleAuthProvider, UserCredential, signInWithPopup } from "firebase/auth"
import { authApp } from ".."

export const sigInWithGoogle = async (): Promise<UserCredential> => {
  return new Promise((resolve, reject) => {
    const provider = new GoogleAuthProvider()
    provider.addScope('profile');
    provider.addScope('email');
    signInWithPopup(authApp, provider)
      .then(result => {
        GoogleAuthProvider.credentialFromResult(result);
        resolve(result)
      })
      .catch(error => {
        GoogleAuthProvider.credentialFromError(error)
        reject(error.message)
      })
  })
}