import { BrowserRouter as Router } from 'react-router-dom'

import { AppRoutes } from './AppRoutes'
import './App.scss'

function App () {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App
