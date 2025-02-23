// import { Container } from './styles/Global'
// import GameBoard from './components/GameBoard/GameBoard'
// import { useState } from 'react'

import GameBoard from "./components/GameBoard/GameBoard"
import Input from "./components/Input"
import { Container } from "./styles/Global"

function App() {
  // const [gameConfig, setGameConfig] = useState<any>(null)
  return (
    <Container>
      <h1>Mine Sweeper</h1>
      <Input id="rowConfig" placeholder="N de linhas" />
      <GameBoard />
    </Container>
  )
}

export default App
