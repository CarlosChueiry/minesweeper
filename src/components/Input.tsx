import { ChangeEvent } from "react";
import { InputContainer, InputElement, Label } from "../styles/Global";

type Props = {
  id: string,
  name: string,
  value: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  type?: 'text' | 'number'
  placeholder?: string,
}

export default function Input({ id, name, value, onChange, type = 'text', placeholder }: Props) {
  return (
    <InputContainer>
      <InputElement
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder=" "
      />
      <Label htmlFor={id}>{placeholder}</Label>
    </InputContainer>
  )
}