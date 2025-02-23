import { InputContainer, InputElement, Label } from "../styles/Global";

type Props = { id: string, placeholder: string }

export default function Input({ id, placeholder }: Props) {
  return (
    <InputContainer>
      <InputElement id={id} placeholder=" " />
      <Label htmlFor={id}>{placeholder}</Label>
    </InputContainer>
  )
}