import { useEffect, useMemo } from 'react'
import { BooleanParam, NumberParam, StringParam, useQueryParam } from 'use-query-params'

import { setCurrentQueryParams } from '../store/orders'

import { columns } from './table/columns'
import { AllOrdersViewTable } from './table/table'
import { TableControls } from './table/table-controls'
import { useCurrentValue, useWebSocket } from '@/hooks'
import { useGetOrdersQuery } from '@/store/api/ebms/ebms'
import type { OrdersQueryParams } from '@/store/api/ebms/ebms.types'
import { useAppDispatch } from '@/store/hooks/hooks'

export const AllOrdersView = () => {
    const [overdue] = useQueryParam('overdue', BooleanParam)
    const [completed] = useQueryParam('completed', BooleanParam)
    const [scheduled] = useQueryParam('scheduled', BooleanParam)
    const [searchTerm] = useQueryParam('search', StringParam)
    const [offsetParam] = useQueryParam('offset', NumberParam)
    const [limitParam] = useQueryParam('limit', NumberParam)
    const [category] = useQueryParam('category', StringParam)
    const [flow] = useQueryParam('flow', StringParam)
    const [ordering] = useQueryParam('orders-ordering', StringParam)

    const queryParams: Partial<OrdersQueryParams> = {
        limit: limitParam!,
        offset: offsetParam!,
        is_scheduled: scheduled,
        ordering: ordering!,
        search: searchTerm,
        completed: completed,
        over_due: overdue!,
        category: category === 'All' ? undefined : category!,
        flow_id: flow ? +flow! : null
    }

    const { currentData, isLoading, isFetching, refetch } = useGetOrdersQuery(queryParams)

    const currentCount = useCurrentValue(currentData?.count)

    const pageCount = useMemo(
        () => (currentCount ? Math.ceil(currentCount! / limitParam!) : 1),
        [isLoading, limitParam, currentCount]
    )

    const { dataToRender } = useWebSocket({
        currentData: currentData?.results || [],
        endpoint: 'orders',
        refetch
    })

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setCurrentQueryParams(queryParams as OrdersQueryParams))
    }, [overdue, completed, scheduled, searchTerm, flow, flow, ordering, category])

    return (
        <>
            <TableControls />
            <AllOrdersViewTable
                columns={columns}
                data={dataToRender || []}
                isDataLoading={isLoading}
                isDataFetching={isFetching}
                pageCount={pageCount}
            />
        </>
    )
}
