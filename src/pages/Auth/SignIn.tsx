import { type LoginData } from '@/api/services/service.types'
import * as Yup from 'yup'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Validation schema
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SignInSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

export default function Signin({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const initialValues: LoginData = {
    username: '',
    password: '',
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
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text" placeholder="m@example.com" required />
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
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
            </div>
            {/* <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div> */}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
