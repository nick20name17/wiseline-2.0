import type { Table } from '@tanstack/react-table'
import { ArrowLeft, ArrowRight, SkipBack, SkipForward } from 'lucide-react'
import { useEffect } from 'react'
import { NumberParam, StringParam, useQueryParam } from 'use-query-params'

import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { tableConfig } from '@/config/table'

interface PaginationProps<TData> {
    table: Table<TData>
    isDataLoading: boolean
}

export const Pagination = <TData,>({ table, isDataLoading }: PaginationProps<TData>) => {
    const [view] = useQueryParam('view', StringParam)
    const [_, setOffset] = useQueryParam('offset', NumberParam)
    const [limit = tableConfig.pagination.pageSize, setLimit] = useQueryParam(
        'limit',
        NumberParam
    )

    useEffect(() => {
        const { pageIndex, pageSize } = table.getState().pagination
        setOffset(pageIndex * pageSize)
    }, [table.getState().pagination.pageIndex, table.getState().pagination.pageSize])

    useEffect(() => {
        setLimit(table.getState().pagination.pageSize)
    }, [table.getState().pagination.pageSize])

    useEffect(() => {
        setOffset(0)
        table.setPageIndex(0)
    }, [view])

    const isPageCount = table.getPageCount()
    const currentPage = table.getState().pagination.pageIndex + 1
    const pageCount = table.getPageCount() || 1

    return (
        <div className='flex items-center space-x-2'>
            <div className='flex items-center space-x-2'>
                <p className='text-sm font-medium'>Rows per page</p>
                <Select
                    disabled={!isPageCount || isDataLoading}
                    value={`${limit || table.getState().pagination.pageSize}`}
                    onValueChange={(value) => table.setPageSize(Number(value))}>
                    <SelectTrigger className='h-8 w-[70px]'>
                        <SelectValue
                            placeholder={`${limit || table.getState().pagination.pageSize}`}
                        />
                    </SelectTrigger>
                    <SelectContent side='top'>
                        {tableConfig.pageSizeOptions.map((pageSize) => (
                            <SelectItem
                                key={pageSize}
                                value={`${pageSize}`}>
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className='flex items-center gap-4'>
                <div className='flex w-[105px] items-center justify-center text-left text-sm font-medium'>
                    Page {currentPage} of {pageCount}
                </div>

                <div className='flex items-center space-x-2'>
                    <Button
                        variant='outline'
                        className='flex h-8 w-8 p-0'
                        onClick={() => table.setPageIndex(0)}
                        disabled={
                            !table.getCanPreviousPage() || !isPageCount || isDataLoading
                        }>
                        <span className='sr-only'>Go to first page</span>
                        <SkipBack className='h-4 w-4' />
                    </Button>
                    <Button
                        variant='outline'
                        className='h-8 w-8 p-0'
                        onClick={() => table.previousPage()}
                        disabled={
                            !table.getCanPreviousPage() || !isPageCount || isDataLoading
                        }>
                        <span className='sr-only'>Go to previous page</span>
                        <ArrowLeft className='h-4 w-4' />
                    </Button>
                    <Button
                        variant='outline'
                        className='h-8 w-8 p-0'
                        onClick={() => table.nextPage()}
                        disabled={
                            !table.getCanNextPage() || !isPageCount || isDataLoading
                        }>
                        <span className='sr-only'>Go to next page</span>
                        <ArrowRight className='h-4 w-4' />
                    </Button>
                    <Button
                        variant='outline'
                        className='flex h-8 w-8 p-0'
                        onClick={() => table.setPageIndex(pageCount - 1)}
                        disabled={
                            !table.getCanNextPage() || !isPageCount || isDataLoading
                        }>
                        <span className='sr-only'>Go to last page</span>
                        <SkipForward className='h-4 w-4' />
                    </Button>
                </div>
            </div>
        </div>
    )
}
