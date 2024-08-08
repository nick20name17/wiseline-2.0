import { type Table } from '@tanstack/react-table'

import { Pagination } from '../../controls/pagination'

import type { OrdersData } from '@/store/api/ebms/ebms.types'

interface TableFooterProps {
    isDataLoading: boolean
    isDataFetching: boolean
    table: Table<OrdersData>
}

export const TableFooter: React.FC<TableFooterProps> = ({
    isDataLoading,
    isDataFetching,
    table
}) => {
    return (
        <div
            className='flex h-14 items-center justify-between gap-3 border-t border-border py-2'
            id='order-pagination'>
            <Pagination
                table={table}
                isDataLoading={isDataLoading || isDataFetching}
            />
        </div>
    )
}
