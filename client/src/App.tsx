import { BrowserRouter as Router } from 'react-router-dom'

import { AppRoutes } from './AppRoutes'
import './App.scss'

function App () {
  return (
    <Router basename="/games/stockfish-chess/client">
      <AppRoutes />
    </Router>
  )
}

export default App
