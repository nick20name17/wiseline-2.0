import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Roles } from '@/store/api/users/users.types'

export const getRoleBadge = (role: Roles) => {
    const colors = {
        admin: 'text-yellow-500 border-yellow-500',
        worker: 'text-blue-500 border-blue-500',
        manager: 'text-green-500 border-green-500',
        client: 'text-orange-500 border-orange-500'
    } as const

    return (
        <Badge
            className={cn(colors[role])}
            variant='outline'>
            {role === 'client' ? 'View only' : role}
        </Badge>
    )
}
