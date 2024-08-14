import { type PropsWithChildren } from 'react'

import { PageLoader } from '@/components/ui/page-loader'
import { useGetUserQuery } from '@/store/api/users/users'

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const userId =
        JSON.parse(localStorage.getItem('id') || 'null')?.id ??
        JSON.parse(sessionStorage.getItem('id') || 'null')?.id

    const { isLoading } = useGetUserQuery(userId)

    return isLoading ? <PageLoader /> : children
}
