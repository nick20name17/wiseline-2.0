import { BooleanParam, NumberParam, StringParam, useQueryParam } from 'use-query-params'

import { columns } from './table/columns'
import { AllDetailsViewTable } from './table/table'
import { useCurrentValue, useWebSocket } from '@/hooks'
import { useGetItemsQuery } from '@/store/api/ebms/ebms'
import type { EBMSItemsQueryParams } from '@/store/api/ebms/ebms.types'

export const AllDetailsView = () => {
    const [overdue] = useQueryParam('overdue', BooleanParam)
    const [completed] = useQueryParam('completed', BooleanParam)
    const [scheduled] = useQueryParam('scheduled', BooleanParam)
    const [searchTerm] = useQueryParam('search', StringParam)
    const [offsetParam] = useQueryParam('offset', NumberParam)
    const [limitParam] = useQueryParam('limit', NumberParam)
    const [date] = useQueryParam('date', StringParam)
    const [flowId] = useQueryParam('flow', StringParam)
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
        flow_id: flowId!,
        is_scheduled: scheduled!,
        category: category === 'All' ? null : category!,
        completed: completed!,
        over_due: overdue!,
        stage_id: stage ? stage! : null
    }

    if (date) {
        queryParams.production_date = date
    }

    const { currentData, isLoading, isFetching, refetch } = useGetItemsQuery(queryParams)

    const pageCount = useCurrentValue(currentData?.count)

    const { dataToRender } = useWebSocket({
        currentData: currentData?.results || [],
        endpoint: 'items',
        refetch
    })

    return (
        <AllDetailsViewTable
            columns={columns}
            data={dataToRender || []}
            isDataLoading={isLoading}
            isDataFetching={isFetching}
            pageCount={pageCount || 0}
        />
    )
}
