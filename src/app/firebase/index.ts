import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { doc, getFirestore, initializeFirestore, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Evita inicializar múltiplas vezes em hot reload do Next.js
const firebaseApp = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];

initializeFirestore(firebaseApp, { ignoreUndefinedProperties: true });

export const authApp = getAuth(firebaseApp);

export const auth = {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
};

const db = getFirestore(firebaseApp);

// Messaging apenas no browser
export const requestNotificationPermission = async () => {
  if (typeof window === 'undefined') return;

  try {
    const { getMessaging, getToken } = await import('firebase/messaging');
    const messaging = getMessaging(firebaseApp);

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return;

    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (token) {
      await saveToken(token);
    }
  } catch (error) {
    console.error('Erro ao obter token de notificação:', error);
  }
};

const saveToken = async (token: string) => {
  onAuthStateChanged(authApp, async (user) => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'users', user.uid), { notificationToken: token }, { merge: true });
    } catch (error) {
      console.error('Erro ao salvar token:', error);
    }
  });
};
