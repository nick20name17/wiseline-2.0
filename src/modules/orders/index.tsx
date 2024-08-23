import { useMemo } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'

import { AllDetailsView } from './all-details-view'
import { AllOrdersView } from './all-orders-view'
import { CutView } from './cut-view'
import { useBodyScrollLock, useMatchMedia } from '@/hooks'

export const Orders = () => {
    const [view] = useQueryParam('view', StringParam)
    const { isTablet } = useMatchMedia()

    useBodyScrollLock(!isTablet)

    const ordersView = useMemo(() => {
        switch (view) {
            case 'cut':
                return <CutView />
            case 'lines':
                return <AllDetailsView />
            default:
                return <AllOrdersView />
        }
    }, [view])

    return ordersView
}
