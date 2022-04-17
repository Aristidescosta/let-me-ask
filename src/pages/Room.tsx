import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import "../styles/rooms.scss";
import { RoomCode } from "./RoomCode";
import { useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};

export function Room() {
  const user = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState("");
  let roomId = "";

  if (typeof params.id === "string") {
    roomId = params.id;
  }

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);
    roomRef.once("value", room => console.log(room.val()));
  }, [roomId]);

  const handleSendNewQuestion = async (event: FormEvent) => {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      toast.error("Pergunta inválida!");
      return;
    }

    if (!user.user) {
      throw new Error("Você não está logado, faça o login");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.user.name,
        avatar: user.user.avatar,
      },
      isHighLigted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion("");
    toast.success("Mensagem enviada com sucesso");
  };

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main className="content">
        <div>
          <Toaster position="top-right" reverseOrder={false} />
        </div>

        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>

        <form onSubmit={handleSendNewQuestion}>
          <textarea
            placeholder="O que você quer perguntar"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            {user.user ? (
              <div className="user-info">
                <img src={user.user.avatar} alt={user.user.name} />
                <span>{ user.user.name }</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta,{" "}
                <button type="button">faça login</button>
              </span>
            )}
            <Button type="submit" disabled={!user.user}>
              Enviar pergunta
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
