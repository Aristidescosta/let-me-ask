import { useNavigate } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

import "../styles/auth.scss";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";
import toast, { Toaster } from "react-hot-toast";

export function Home() {
  let navigate = useNavigate();
  const { sigInWithGoogle, user } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await sigInWithGoogle();
    }
    navigate("/rooms/new");
  }

  async function hanldeJoinRoom(event: FormEvent) {
    event.preventDefault();

    if(roomCode.trim() === "") return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()){
      toast.error("A sala que estás a tentar acessar, não existe!");
      return;
    }

    navigate(`rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <div><Toaster/></div>
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button className="create-rom" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={hanldeJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
