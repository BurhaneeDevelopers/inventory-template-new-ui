import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { userAtom } from './../jotai/jotaiStore'
import { apiService } from '../src/apiService/apiService'

const AuthProvider = ({ children }) => {
  const [, setUser] = useAtom(userAtom)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken')
        if (token) {
          const res = await apiService.get('/profile')
          setUser(res.data)
        }
      } catch (err) {
        console.error('Failed to fetch profile', err)
        localStorage.clear()
      }
    }

    fetchProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return children
}

export default AuthProvider
