import { InputProps } from "../../../types";

export const Input = ({ type, value, placeholder, onChange }: InputProps) => {
  return (
    <input
      className="bg-white rounded-md border-1 border-gray-400 border-solid px-2 py-1"
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
