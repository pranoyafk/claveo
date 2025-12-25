import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Spinner } from '@/components/ui/spinner'
import { authClient } from '@/lib/auth/client'
import type { User } from '@/lib/auth/config'
import { authQueries } from '@/lib/queries/auth'
import { IconLogout, IconUserCircle } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { useTransition } from 'react'
import { toast } from 'sonner'

export function UserMenu({ user }: { user: User }) {
  const queryClient = useQueryClient()
  const [isSigningOutPending, startSigningOut] = useTransition()
  const router = useRouter()
  const handleSignOut = async () => {
    const { error } = await authClient.signOut()
    if (error) {
      toast.error(error.message || 'Internal Server Error')
      return
    }
    queryClient.invalidateQueries({
      queryKey: authQueries.all,
    })
    router.invalidate()
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {user.image ? (
            <AvatarImage src={user.image} />
          ) : (
            <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <IconUserCircle />
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          closeOnClick={false}
          onClick={() => startSigningOut(handleSignOut)}
        >
          {isSigningOutPending ? <Spinner /> : <IconLogout />}
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
