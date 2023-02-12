import * as Select from "@radix-ui/react-select";
import { ArrowDown, ArrowUp } from "phosphor-react";
import { Game } from "../../App";
import SelectInput from "./SelectInput";

interface Props {
    data: Game[]
}

const SelectModal = ({data}: Props) => {
  return (
    <div>
      <Select.Trigger className="bg-zinc-900 px-3 py-4 rounded text-s text-zinc-500 flex flex-row gap-24 items-center">
        <Select.Value placeholder="Selecione o game que deseja jogar" />
        <Select.Icon>
          <ArrowDown size={16} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden bg-zinc-700 fixed w-[25rem] py-2 rounded text-sm top-1/2 left-1/3 translate-x-64 -translate-y-36">
          <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-zin-700 cursor-default">
            <ArrowUp />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-1">
            <Select.Group>
                {/* Adicionar tudo */}
                {data.map(game => {return <SelectInput key={game.id} value={game.id} textName={game.title} />})}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-zin-700 cursor-default">
            <ArrowDown />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </div>
  );
};

export default SelectModal;
