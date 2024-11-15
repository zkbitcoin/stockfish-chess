import { Admin } from 'admin'
import { Route, Routes } from 'react-router-dom'

import { Login, Game, Main } from 'views'
import { Register } from 'views/Register'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/admin' element={<Admin />} />
      <Route path='/game/:id' element={<Game />} />
      <Route path='/' element={<Main />}>
        {/* Nested Routes */}
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
      </Route>
    </Routes>
  )
}
