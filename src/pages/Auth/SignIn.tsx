import LoginForm from '@/components/forms/LoginForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Signin({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
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
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}
