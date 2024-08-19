import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'

import { Head } from '@/components/meta-head'
import { Toaster } from '@/components/ui/sonner'
import { ErrorPage } from '@/pages/error-page'
import { RoleProvider } from '@/providers/role-provider'

export const Layout = () => {
    return (
        <QueryParamProvider
            adapter={ReactRouter6Adapter}
            options={{
                updateType: 'replaceIn'
            }}>
            <Head />
            <main>
                <ErrorBoundary fallback={<ErrorPage message='Something went wrong' />}>
                    <div className='mx-auto px-3'>
                        <RoleProvider>
                            <Outlet />
                        </RoleProvider>
                    </div>
                </ErrorBoundary>
            </main>
            <Toaster
                richColors
                duration={5000}
            />
        </QueryParamProvider>
    )
}
