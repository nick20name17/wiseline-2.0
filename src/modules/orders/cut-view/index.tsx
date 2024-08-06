import { useMemo } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'

import { Controls } from './controls'
import { useCuttingItemsWebSocket } from './hooks/use-cutting-view-websocket'
import { AllOrdersTable } from './table/all-orders-table'
import { columns } from './table/columns'
import { CutViewTable } from './table/table'
import { useCurrentValue } from '@/hooks/use-current-value'
import { usePagination } from '@/hooks/use-pagination'
import { useGetCuttingViewItemsQuery } from '@/store/api/ebms/ebms'

export interface CuttingItemsToDisplay {
    total: number
    color: string
    size: number
    v2: number
    press_brake: number
    caps: number
    roll_former: number
    new_stage_2: number
    autoid: string
}

export const CutView = () => {
    const { limit, offset } = usePagination()

    // const [category] = useQueryParam('category', StringParam)
    const [cutView] = useQueryParam('cut-view', StringParam)
    const [color] = useQueryParam('color', StringParam)

    const {
        currentData: cuttingItems,
        isLoading,
        isFetching,
        refetch
    } = useGetCuttingViewItemsQuery({
        color: color === 'all' ? '' : color,
        limit,
        offset
    })

    const { dataToRender } = useCuttingItemsWebSocket({
        currentData: cuttingItems?.results || [],
        refetch
    })

    const currentCount = useCurrentValue(cuttingItems?.count)

    const pageCount = useMemo(
        () => (currentCount ? Math.ceil(currentCount! / limit) : 1),
        [isLoading, limit, currentCount]
    )

    return (
        <>
            <Controls />
            {cutView === 'cut-list-pipeline' ? (
                <CutViewTable
                    key={color}
                    data={dataToRender || []}
                    isDataLoading={isLoading}
                    isDataFetching={isFetching}
                    columns={columns}
                    pageCount={pageCount}
                />
            ) : (
                <AllOrdersTable />
            )}
        </>
    )
}
