import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const Stack = styled.div<{ direction: 'row' | 'column', spacing?: number }>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  gap: ${({ spacing }) => `${spacing}px`}; 
`

export const InputContainer = styled.div`
  position: relative;
`

export const InputElement = styled.input`
  height: 40px;
  padding: 8px 16px;
  border: 2px solid lightgray;
  border-radius: 4px;
  outline: none;
  background-color: #242424;

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: 0px;
    left: 8px;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  & {
    -moz-appearance: textfield;
  }
`

export const Label = styled.label`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 4px;
  background-color: #242424;
  font-size: 14px;
  line-height: 1;
  transition: all 0.15s ease-out;
`;