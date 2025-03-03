import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { doc, getFirestore, initializeFirestore, setDoc } from 'firebase/firestore';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const API_KEY = import.meta.env.VITE_API_KEY;
const AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN;
const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
const STORAGE_BUCKET = import.meta.env.VITE_STORAGE_BUCKET;
const MESSAGING_SENDER_ID = import.meta.env.VITE_MESSAGING_SENDER_ID;
const APP_ID = import.meta.env.VITE_APP_ID;
const VAPID_KEY = import.meta.env.VITE_VAPID_KEY;


const firebaseApp = initializeApp({
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
});

initializeFirestore(firebaseApp, { ignoreUndefinedProperties: true });

export const authApp = getAuth(firebaseApp);

export const auth = {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
};

const messaging = getMessaging(firebaseApp);

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    console.log("Permissão para notificações:", permission);
    if (permission === "granted") {
      const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
      const token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: registration,
      });

      if (token) {
        await saveToken(token)
        console.log("TOKEN: ", token)
      } else {
        console.error("Nenhum token disponível. Verifique permissões.");
      }
    } else {
      console.error("Permissão negada para notificações.");
    }
  } catch (error) {
    console.error("Erro ao obter token de notificação:", error);
  }
};

const db = getFirestore(firebaseApp);

const saveToken = async (token: string) => {
  onAuthStateChanged(authApp, async (user) => {
    if (!user) {
      console.error("Nenhum usuário logado.");
      return;
    }

    try {
      await setDoc(doc(db, "users", user.uid), { notificationToken: token }, { merge: true });
      console.log("Token salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar token:", error);
    }
  });
};
onMessage(messaging, (payload) => {
  console.log("Notificação recebida:", payload);
});
