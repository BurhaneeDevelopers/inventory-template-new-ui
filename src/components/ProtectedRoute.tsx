// import { useAtom } from 'jotai';
// import { userAtom } from '../../jotai/jotaiStore';
import { Navigate, Outlet } from 'react-router'

function ProtectedRoute() {
  // const [user] = useAtom(userAtom);
  const token = localStorage.getItem('accessToken')

  if (!token) {
    return <Navigate to="/signin" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
