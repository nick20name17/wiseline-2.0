import { useEffect, useMemo } from 'react'
import { BooleanParam, NumberParam, StringParam, useQueryParam } from 'use-query-params'

import { setCurrentQueryParams } from '../store/orders'

import { columns } from './table/columns'
import { AllDetailsViewTable } from './table/table'
import { TableControls } from './table/table-controls'
import { useCurrentValue, useWebSocket } from '@/hooks'
import { useGetItemsQuery } from '@/store/api/ebms/ebms'
import type { EBMSItemsQueryParams } from '@/store/api/ebms/ebms.types'
import { useAppDispatch } from '@/store/hooks/hooks'

export const AllDetailsView = () => {
    const [overdue] = useQueryParam('overdue', BooleanParam)
    const [completed] = useQueryParam('completed', BooleanParam)
    const [scheduled] = useQueryParam('scheduled', BooleanParam)
    const [searchTerm] = useQueryParam('search', StringParam)
    const [offsetParam] = useQueryParam('offset', NumberParam)
    const [limitParam] = useQueryParam('limit', NumberParam)
    const [date] = useQueryParam('date', StringParam)
    const [flow] = useQueryParam('flow', StringParam)
    const [stage] = useQueryParam('stage', StringParam)
    const [category] = useQueryParam('category', StringParam)
    const [ordering] = useQueryParam('details-ordering', StringParam)

    // useEffect(() => {
    //     if (grouped) {
    //         setSorting([{ id: 'order', desc: false }])
    //     }
    // }, [grouped])

    const queryParams: Partial<EBMSItemsQueryParams> = {
        offset: offsetParam!,
        limit: limitParam!,
        ordering: ordering!,
        search: searchTerm!,
        flow_id: flow!,
        is_scheduled: scheduled!,
        category: category === 'All' ? undefined : category!,
        completed: completed!,
        over_due: overdue!,
        stage_id: stage ? stage! : undefined
    }

    if (date) {
        queryParams.production_date = date
    }

    const { currentData, isLoading, isFetching, refetch } = useGetItemsQuery(queryParams)

    const currentCount = useCurrentValue(currentData?.count)

    const pageCount = useMemo(
        () => (currentCount ? Math.ceil(currentCount! / limitParam!) : 1),
        [isLoading, limitParam, currentCount]
    )

    const { dataToRender } = useWebSocket({
        currentData: currentData?.results || [],
        endpoint: 'items',
        refetch
    })

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setCurrentQueryParams(queryParams as EBMSItemsQueryParams))
    }, [
        overdue,
        completed,
        scheduled,
        searchTerm,
        flow,
        stage,
        date,
        flow,
        category,
        ordering
    ])

    return (
        <>
            <TableControls />
            <AllDetailsViewTable
                columns={columns}
                data={dataToRender || []}
                isDataLoading={isLoading}
                isDataFetching={isFetching}
                pageCount={pageCount}
            />
        </>
    )
}
