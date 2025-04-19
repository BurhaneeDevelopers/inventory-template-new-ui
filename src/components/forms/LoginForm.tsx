import { useState } from 'react'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'
import { LoginData } from '@/api/services/service.types'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

// Validation schema
const SignInSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password must be at least 4 characters'),
})

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const initialValues: LoginData = {
    username: '',
    password: '',
  }

  const handleSubmit = async (values: LoginData) => {
    setIsSubmitting(true)
    try {
      // TODO: Implement your authentication logic here
      console.log('Form values:', values)
      // await authService.login(values.username, values.password)
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <Formik initialValues={initialValues} validationSchema={SignInSchema} onSubmit={handleSubmit}>
      {({ errors, touched }) => (
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
            {errors.username && touched.username && (
              <div className="text-sm text-red-500">{errors.username}</div>
            )}
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
            {errors.password && touched.password && (
              <div className="text-sm text-red-500">{errors.password}</div>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
