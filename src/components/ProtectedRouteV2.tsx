import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router'
import tokenService from '@/api/services/tokenService'

function ProtectedRoute() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const accessToken = tokenService.getAccessToken()
        const refreshToken = tokenService.getRefreshToken()

        if (!accessToken && refreshToken) {
          await tokenService.fetchRefreshToken()
          setIsAuthenticated(true)
        } else if (accessToken) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        tokenService.clearAccessToken()
        tokenService.clearRefreshToken()
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    verifyAuth()
  }, []) // Empty dependency array since we don't use any dependencies

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
