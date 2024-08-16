import type { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { adminOnlyRoutes, routes } from '@/config/routes'
import { useCurrentUserRole } from '@/hooks'

export const RoleProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const location = useLocation()

    const isWorkerOrClient = useCurrentUserRole(['worker', 'client'])

    if (isWorkerOrClient && adminOnlyRoutes.includes(location.pathname as any)) {
        return (
            <Navigate
                to={routes.main}
                state={{ from: location }}
                replace
            />
        )
    }

    return children
}
