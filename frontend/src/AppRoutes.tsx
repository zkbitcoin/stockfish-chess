import { Admin } from 'admin'
import { Route, Routes } from 'react-router-dom'
import { Login, Game, Main } from 'views'
import { Register } from 'views/Register'

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Non-Nested Routes */}
      <Route path='/admin' element={<Admin />} />
      <Route path='/game/:id' element={<Game />} />

      {/* Main Route with Nested Routes */}
      <Route path='/' element={<Main />}>
        {/* Nested Routes under "/" */}
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
      </Route>
    </Routes>
  )
}
