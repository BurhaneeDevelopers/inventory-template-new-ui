import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router'

export function Header() {
  const navigate = useNavigate()
  return (
    <header className="flex h-(--header-height) shrink-0 justify-between items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) p-2 bg-white">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">Apparel Kingdom</h1>
      </div>

      <div className="flex gap-4 pr-4">
        <img src="/image.png" alt="Apparel Kingdom" className="w-16 h-12" />
        <Popover>
          <PopoverTrigger className="cursor-pointer">
            <Avatar>
              <AvatarImage src="https://avatar.iran.liara.run/public/boy?username=Ash" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <Button
              className="flex"
              variant={'outline'}
              onClick={() => {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                navigate('/signin')
              }}
            >
              <LogOut />
              <span>Log Out</span>
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  )
}
