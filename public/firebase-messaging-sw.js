/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBjYP6DLcE7OlzzhvdSeEf0ncAuhBVneOY",
  authDomain: "letmeask-a875f.firebaseapp.com",
  databaseURL: "https://letmeask-a875f-default-rtdb.firebaseio.com",
  projectId: "letmeask-a875f",
  storageBucket: "letmeask-a875f.firebasestorage.app",
  messagingSenderId: "552940035247",
  appId: "1:552940035247:web:2b3aa22dec3eed02f0485a"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Recebeu mensagem em segundo plano", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo192.png", // Substitua pelo ícone da sua aplicação
  });
});
