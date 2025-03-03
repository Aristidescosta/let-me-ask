import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";

admin.initializeApp();

export const sendNewQuestionNotification = onDocumentCreated(
  "rooms/{roomId}/questions/{questionId}",
  async (event) => {
    const question = event.data?.data();
    const roomId = event.params.roomId;
    console.log("TESTE")

    if (!question) return null;

    // Obter todos os usuários
    const usersSnapshot = await admin.firestore().collection("users").get();
    const tokens: string[] = [];

    usersSnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.notificationToken) {
        tokens.push(userData.notificationToken);
      }
    });

    if (tokens.length === 0) return null;

    const message = {
      tokens, // Usa `sendEachForMulticast` para múltiplos tokens
      notification: {
        title: "Nova pergunta adicionada!",
        body: `Uma nova pergunta foi adicionada à sala ${roomId}`,
      },
    };

    return admin.messaging().sendEachForMulticast(message);
  }
);
