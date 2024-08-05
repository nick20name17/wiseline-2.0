import { useMemo } from 'react'
import { BooleanParam, NumberParam, StringParam, useQueryParam } from 'use-query-params'

import { columns } from './table/columns'
import { AllOrdersViewTable } from './table/table'
import { TableControls } from './table/table-controls'
import { useCurrentValue, useWebSocket } from '@/hooks'
import { useGetOrdersQuery } from '@/store/api/ebms/ebms'
import type { OrdersQueryParams } from '@/store/api/ebms/ebms.types'

export const AllOrdersView = () => {
    const [overdue] = useQueryParam('overdue', BooleanParam)
    const [completed] = useQueryParam('completed', BooleanParam)
    const [scheduled] = useQueryParam('scheduled', BooleanParam)
    const [searchTerm] = useQueryParam('search', StringParam)
    const [offsetParam] = useQueryParam('offset', NumberParam)
    const [limitParam] = useQueryParam('limit', NumberParam)
    const [category] = useQueryParam('category', StringParam)
    const [stage] = useQueryParam('stage', StringParam)
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
        category: category === 'All' ? '' : category!,
        stage_id: stage ? +stage! : null,
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
