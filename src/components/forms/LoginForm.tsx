import { LoginData } from '@/api/services/service.types'
import tokenService from '@/api/services/tokenService'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import * as Yup from 'yup'
import { userAtom } from '../../../jotai/jotaiStore'
import { apiService } from '../../apiService/apiService'

// Validation schema
const SignInSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password must be at least 4 characters'),
})

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [, setUser] = useAtom(userAtom)
  const initialValues: LoginData = {
    username: '',
    password: '',
  }
  const navigate = useNavigate()

  const handleSubmit = async (values: LoginData) => {
    setIsSubmitting(true)
    try {
      const response = await apiService.post(apiService.v1 + '/login', values)

      if (response) {
        // Assuming response contains accessToken and refreshToken
        const { AccessToken, RefreshToken } = response

        tokenService.setAccessToken(AccessToken)
        tokenService.setRefreshToken(RefreshToken)

        setUser(response) // from your userAtom
        navigate('/')
      }
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <Formik initialValues={initialValues} validationSchema={SignInSchema} onSubmit={handleSubmit}>
      {({ isSubmitting: formSubmitting }) => (
        <Form className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Field
              as={Input}
              id="username"
              name="username"
              type="username"
              placeholder="m@example.com"
            />
            <ErrorMessage name="username" component="div" className="text-sm text-red-500" />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Field as={Input} id="password" name="password" type="password" />
            <ErrorMessage name="password" component="div" className="text-sm text-red-500" />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting || formSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
