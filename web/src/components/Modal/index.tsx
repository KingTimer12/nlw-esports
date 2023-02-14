import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { Check, GameController, ArrowDown, ArrowUp } from "phosphor-react";
import FormInput from "../FormInput";
import { useEffect, useState, FormEvent } from "react";
import SelectModal from "../SelectModal";
import axios from "axios";
import { convertStringToMinutes } from "../../utils/convertString";

export interface Game {
  id: string;
  title: string;
}

function Modal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(() => {
    axios("http://localhost:3000/games").then((response) =>
      setGames(response.data)
    );
  }, []);

  const handleSubmited = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    console.log(data)

    //Validação

    await axios
      .post(`http://localhost:3000/games/${data.game}/ads`, {
        name: data.nickname,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.join(","),
        hourStart: convertStringToMinutes(data.hourStart),
        hourEnd: convertStringToMinutes(data.hourEnd),
        useVoiceChannel: useVoiceChannel,
      })
      .then(() => {
        alert("Anúncio criado com sucesso");
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao criar o anúncio");
      });
  };

  return (
    <div>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
        <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25">
          <Dialog.Title className="text-3xl font-black">
            Publique um anúncio
          </Dialog.Title>
          <form onSubmit={handleSubmited} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="game">
                Qual o game?
              </label>
              <select
              name="game"
                id="game"
                className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
                defaultValue=""
              >
                <option disabled value="">
                  Selecione o jogo que deseja jogar
                </option>
                {games.map((game) => <option key={game.id} value={game.id}>{game.title}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="nickname">
                Seu nickname
              </label>
              <FormInput
                name="nickname"
                id="nickname"
                placeholder="Como te chamam dentro do game?"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="yearsPlaying">
                  Joga há quantos anos?
                </label>
                <FormInput
                  name="yearsPlaying"
                  id="yearsPlaying"
                  type="number"
                  placeholder="Tudo bem ser ZERO"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="discord">
                  Qual seu Discord?
                </label>
                <FormInput
                  name="discord"
                  id="discord"
                  placeholder="Usuario#0000"
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="weekDays">
                  Quando costuma jogar?
                </label>

                <ToggleGroup.Root
                  type="multiple"
                  className="grid grid-cols-4 gap-2"
                  onValueChange={setWeekDays}
                >
                  <ToggleGroup.Item
                    value="0"
                    title="Domingo"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    D
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="1"
                    title="Segunda"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="2"
                    title="Terça"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="3"
                    title="Quarta"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="4"
                    title="Quinta"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="5"
                    title="Sexta"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="6"
                    title="Sábado"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="font-semibold" htmlFor="hourStart">
                  Qual horário do dia?
                </label>
                <div className="grid grid-cols-2 gap-1">
                  <FormInput
                    name="hourStart"
                    type="time"
                    id="hourStart"
                    placeholder="De"
                  />
                  <FormInput
                    name="hourEnd"
                    type="time"
                    id="hourEnd"
                    placeholder="Até"
                  />
                </div>
              </div>
            </div>

            <label className="mt-2 flex gap-2 text-sm items-center">
              <Checkbox.Root
                checked={useVoiceChannel}
                onCheckedChange={(checked) => {
                  if (checked != "indeterminate" && (checked as boolean)) {
                    setUseVoiceChannel(checked);
                  }
                }}
                className="w-6 h-6 rounded bg-zinc-900"
              >
                <Checkbox.Indicator>
                  <Check className="text-emerald-400 p-1" size={24} />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>

            <footer className="mt-4 flex justify-end gap-4">
              <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
                Cancelar
              </Dialog.Close>
              <button
                type="submit"
                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
              >
                <GameController size={24} /> Encontrar Duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </div>
  );
}

export default Modal;
