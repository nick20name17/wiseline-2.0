import { type Table } from '@tanstack/react-table'

import { ColumnVisibility } from '../../controls/column-visibility'
import { Pagination } from '../../controls/pagination'

import type { EBMSItemsData } from '@/store/api/ebms/ebms.types'

interface TableFooterProps {
    isDataLoading: boolean
    isDataFetching: boolean
    table: Table<EBMSItemsData>
}

export const TableFooter: React.FC<TableFooterProps> = ({
    isDataLoading,
    isDataFetching,
    table
}) => {
    return (
        <div
            className='flex items-center justify-between gap-3 px-4 py-2'
            id='order-pagination'>
            <Pagination
                table={table}
                isDataLoading={isDataLoading || isDataFetching}
            />
            <ColumnVisibility
                isDataLoading={isDataLoading || isDataFetching}
                table={table}
                page='items'
            />
        </div>
    )
}
