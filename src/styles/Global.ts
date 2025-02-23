import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
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