import * as Select from "@radix-ui/react-select";
import { CheckSquare } from "phosphor-react";

interface Props {
  value: string;
  textName: string;
}

const SelectInput = ({value, textName}: Props) => {

  return (
    <Select.Item
      value={value}
      className="leading-none rounded-sm flex items-center h-6 relative"
    >
      <Select.ItemText>{textName}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
        <CheckSquare />
      </Select.ItemIndicator>
    </Select.Item>
  );
};

export default SelectInput;
