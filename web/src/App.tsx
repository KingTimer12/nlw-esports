import "./styles/main.css";

import logoImg from "./assets/logo-nlw-esports.svg";
import GameCard from "./components/GameCard";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import PublishCard from "./components/PublishCard";
import Modal from "./components/Modal";
import axios from "axios";

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => setGames(response.data));
  }, []);

  //Kean slider
  //react hook forms

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="bg-nlw-gradient text-transparent bg-clip-text">
          duo
        </span>{" "}
        está aqui
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameCard
              key={game.id}
              uri={game.bannerUrl}
              title={game.title}
              ads={game._count.ads}
            />
          );
        })}
      </div>

      <Dialog.Root>
        <PublishCard /> {/* Trigger/Botão para o modal */}
        <Modal />
      </Dialog.Root>
    </div>
  );
}

export default App;
