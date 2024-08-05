import type { ColumnDef } from '@tanstack/react-table'

export interface DataTableProps<T> {
    columns: ColumnDef<T, T>[]
    data: T[]
    isDataLoading: boolean
    isDataFetching: boolean
    pageCount: number
}
