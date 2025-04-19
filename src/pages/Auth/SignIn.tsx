import { useState } from 'react'
import * as Yup from 'yup'
import { type LoginData } from '@/api/services/service.types'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Field, Form, Formik } from 'formik'

// Validation schema
const SignInSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

export default function Signin({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
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
    <div
      className={`flex flex-col !h-screen justify-center items-center gap-6 ${className}`}
      {...props}
    >
      <Card>
        <CardHeader className="flex flex-col gap-2 items-center justify-center">
          <img src="/logo.png" alt="Bay 53" className="w-44 h-32 translate-x-7" />
          <CardTitle className="text-3xl">Login</CardTitle>
          <CardDescription className="mb-5 text-gray-400">
            Enter your username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="w-96">
          <Formik
            initialValues={initialValues}
            validationSchema={SignInSchema}
            onSubmit={handleSubmit}
          >
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
        </CardContent>
      </Card>
    </div>
  )
}
