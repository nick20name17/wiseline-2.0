import {
    Asterisk,
    Calendar,
    CircleUserRound,
    Cog,
    Gauge,
    Menu,
    MenuSquare,
    Package2,
    PackageIcon,
    Truck
} from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

import logo from '@/assets/images/logo.svg'
import { Badge } from '@/components/ui/badge'
import {
    Command,
    CommandItem,
    CommandList,
    CommandShortcut
} from '@/components/ui/command'
import { Separator } from '@/components/ui/separator'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'
import { adminOnlyRoutes, routes } from '@/config/routes'
// import { useCurrentUserRole } from '@/hooks'
import { useCurrentUserRole } from '@/hooks'
import { cn } from '@/lib/utils'

const navigationItems = [
    {
        icon: MenuSquare,
        label: 'Orders',
        link: routes.orders,
        soon: false
    },
    {
        icon: Cog,
        label: 'Flow Settings',
        link: routes.flowSettings,
        soon: false
    },
    {
        icon: CircleUserRound,
        label: 'Users',
        link: routes.users,
        soon: false
    },
    {
        icon: Calendar,
        label: 'Calendar',
        link: routes.calendar,
        soon: false
    },
    {
        icon: Asterisk,
        label: 'Priorities',
        link: routes.priorities,
        soon: false
    },
    {
        icon: Gauge,
        label: 'Dashboard',
        link: '/',
        soon: true
    },
    {
        icon: PackageIcon,
        label: 'Packaging',
        link: '/',
        soon: true
    },
    {
        icon: Package2,
        label: 'Dispatch',
        link: '/',
        soon: true
    },
    {
        icon: Truck,
        label: 'Delivery',
        link: '/',
        soon: true
    }
]

export const SideBar = () => {
    const isClientOrWorker = useCurrentUserRole(['client', 'worker'])

    return (
        <Sheet>
            <SheetTrigger className='rounded-md bg-secondary p-2'>
                <Menu />
            </SheetTrigger>
            <SheetContent
                className='z-[1001] w-[300px]'
                side='left'>
                <SheetHeader>
                    <NavLink to={routes.orders}>
                        <SheetTitle asChild>
                            <div className='flex items-center gap-x-3 uppercase'>
                                <img
                                    src={logo}
                                    alt='Wiseline'
                                />
                                Wiseline
                            </div>
                        </SheetTitle>
                    </NavLink>
                </SheetHeader>

                <Separator className='my-4' />

                <Command>
                    <CommandList className='max-h-fit'>
                        {navigationItems.map((item) =>
                            isClientOrWorker &&
                            adminOnlyRoutes.includes(item.link as any) ? null : (
                                <CommandItem
                                    asChild
                                    key={item.label}
                                    className={cn(
                                        'mt-2 cursor-pointer',
                                        item.soon
                                            ? 'pointer-events-none text-muted-foreground'
                                            : ''
                                    )}>
                                    <NavLink to={item.link}>
                                        {React.createElement(item.icon, {
                                            className: 'mr-2 w-4 h-4'
                                        })}
                                        <span>{item.label}</span>
                                        {item?.soon ? (
                                            <CommandShortcut>
                                                <Badge
                                                    variant='outline'
                                                    className='pointer-events-none font-normal tracking-normal'>
                                                    Soon
                                                </Badge>
                                            </CommandShortcut>
                                        ) : null}
                                    </NavLink>
                                </CommandItem>
                            )
                        )}
                    </CommandList>
                </Command>
            </SheetContent>
        </Sheet>
    )
}
