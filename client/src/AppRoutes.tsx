import { Admin } from './admin'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Login, Game, Main } from './views'
import { Register } from './views/Register'
import { useParams } from 'react-router'

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Non-Nested Routes */}
      <Route path='/admin/*' element={<Admin />} />
      {/* Redirect /users to /admin/users */}
      <Route path='/users' element={<Navigate to='/admin/users' />} />
      {/* Handle dynamic routes for /users/:id */}
      <Route
        path='/users/:id'
        element={<RedirectToAdminUser />}
      />
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

// This component handles redirecting with the dynamic `id`
const RedirectToAdminUser = () => {
  const { id } = useParams() // Extract the dynamic `id` from the URL
  return <Navigate to={`/admin/users/${id}`} /> // Redirect to the /admin/users/:id path
}
