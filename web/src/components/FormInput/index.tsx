import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> { }

const FormInput = ({...rest}: Props) => {
  return (
    <input
        {...rest}
        className="bg-zinc-900 px-3 py-4 rounded text-sm placeholder:text-zinc-500"
      />
  );
};

export default FormInput;
