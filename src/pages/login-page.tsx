import { Navigate, useLocation } from 'react-router-dom'

import { routes } from '@/config/routes'
import { Login } from '@/modules'
import { useAppSelector } from '@/store/hooks/hooks'
import { selectIsAuth } from '@/store/slices/auth'

export const LoginPage = () => {
    const location = useLocation()
    const isAuth = useAppSelector(selectIsAuth)

    if (location.pathname === routes.login && isAuth) {
        return (
            <Navigate
                to={routes.main}
                state={{ from: location }}
                replace
            />
        )
    }

    return <Login />
}
