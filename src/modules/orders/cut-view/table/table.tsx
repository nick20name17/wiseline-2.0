import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table'
import { groupBy } from 'lodash'
import { Fragment, useRef } from 'react'

import { getCommonPinningStyles, groupByGauge, mergeItems } from '../utils'

import { TableFooter } from './table-footer'
import { DataTableColumnHeader, TableSkeleton } from '@/components/shared'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { usePagination } from '@/hooks'
import { useMatchMedia } from '@/hooks/use-match-media'
import { useTableScroll } from '@/hooks/use-table-scroll'
import { cn } from '@/lib/utils'
import type { CuttingItem } from '@/store/api/ebms/ebms.types'
import { useGetAllFlowsQuery } from '@/store/api/flows/flows'
import type { DataTableProps } from '@/types/table'

export interface MergedCuttingItem {
    color: string
    size: number
    flow_names: { [key: string]: number }
    gauge: string
    quantity: number
    autoids: string[]
    length: number
    cutting_complete: boolean
}

export const CutViewTable: React.FC<DataTableProps<CuttingItem, MergedCuttingItem>> = ({
    data,
    isDataLoading,
    isDataFetching,
    columns,
    pageCount
}) => {
    const { limit, offset, setPagination } = usePagination()

    const { data: trimFlows, isLoading: isLoadingTrimFlows } = useGetAllFlowsQuery({
        category__prod_type: 'Trim'
    })

    const mergedItems = mergeItems(data)

    const trimColumns =
        trimFlows?.map((flow) => ({
            accessorKey: flow.name,
            header: ({ column }: any) => (
                <DataTableColumnHeader
                    column={column}
                    title={flow.name}
                    sortable={false}
                    className='w-40'
                />
            ),
            cell: () => <div className='w-40 text-center'></div>
        })) || []

    const allColumns = [...columns]

    allColumns.splice(2, 0, ...trimColumns)

    const table = useReactTable({
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onPaginationChange: setPagination,
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        data: mergedItems,
        columns: allColumns,
        autoResetPageIndex: false,
        enableColumnPinning: true,
        pageCount,
        state: {
            columnPinning: {
                right: ['cutting_complete']
            },
            pagination: {
                pageIndex: offset / limit,
                pageSize: limit
            }
        }
    })

    const tableRef = useRef<HTMLTableElement>(null)

    const { isTablet } = useMatchMedia()

    useTableScroll({ tableRef, enableScroll: !isTablet, isCuttingView: true })

    const groupedData = groupByGauge(table.getRowModel().rows || [])
    const colSpan = columns.length + trimColumns.length + 1

    return (
        <div className='mt-4 rounded-md'>
            <Table
                ref={tableRef}
                containerClassname='h-fit overflow-y-auto'>
                <TableHeader className='sticky top-0 z-10 bg-background py-0.5'>
                    {isLoadingTrimFlows ? (
                        <TableRow className='p-0'>
                            <TableCell
                                colSpan={colSpan}
                                className='h-[41px] !px-0 py-1.5'>
                                <Skeleton className='h-[41px] w-full' />
                            </TableCell>
                        </TableRow>
                    ) : (
                        table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const isCuttingComplete =
                                        header.column.id === 'cutting_complete'
                                    const commonPinningStyles = getCommonPinningStyles(
                                        header.column
                                    )
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className={cn(
                                                '!px-0.5',
                                                isCuttingComplete
                                                    ? commonPinningStyles
                                                    : ''
                                            )}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef.header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))
                    )}
                </TableHeader>

                <TableBody>
                    {groupedData.length ? (
                        groupedData?.map(({ gauge, cuttingItems }) => {
                            const groupedByColor = groupBy(cuttingItems, 'original.color')

                            return isDataLoading || isLoadingTrimFlows ? (
                                <TableSkeleton columnsCount={allColumns.length} />
                            ) : (
                                <Fragment key={gauge}>
                                    <TableRow className='!p-0'>
                                        <TableCell
                                            className='py-2 pl-7 font-bold'
                                            colSpan={colSpan}>
                                            Gauge: {gauge || '-'}
                                        </TableCell>
                                    </TableRow>
                                    {Object.entries(groupedByColor)?.map(
                                        ([key, rows]) => {
                                            return (
                                                <Fragment key={key}>
                                                    <TableRow className='!p-0'>
                                                        <TableCell
                                                            className='!p-0'
                                                            colSpan={colSpan}>
                                                            <Badge
                                                                variant='secondary'
                                                                className='!m-0 w-full !rounded-none py-2'>
                                                                <div className='pl-4'>
                                                                    Color: {key || '-'}
                                                                </div>
                                                            </Badge>
                                                        </TableCell>
                                                    </TableRow>
                                                    {rows.map((row) => {
                                                        return (
                                                            <TableRow
                                                                key={
                                                                    row.original
                                                                        .autoids[0]
                                                                }
                                                                className='!p-0 odd:bg-secondary/60'>
                                                                {row
                                                                    ?.getVisibleCells()
                                                                    .map((cell) => {
                                                                        const trimQuantity =
                                                                            row.original
                                                                                .flow_names

                                                                        const trimFlowsNames =
                                                                            trimFlows?.map(
                                                                                (flow) =>
                                                                                    flow.name
                                                                            )

                                                                        const trimQuantities =
                                                                            trimFlowsNames?.map(
                                                                                (
                                                                                    flowName
                                                                                ) =>
                                                                                    trimQuantity[
                                                                                        flowName
                                                                                    ] || 0
                                                                            ) || []

                                                                        const totalQuantity =
                                                                            trimQuantities.reduce(
                                                                                (a, b) =>
                                                                                    a + b,
                                                                                0
                                                                            )

                                                                        const isCuttingComplete =
                                                                            cell.column
                                                                                .id ===
                                                                            'cutting_complete'
                                                                        const commonPinningStyles =
                                                                            getCommonPinningStyles(
                                                                                cell.column
                                                                            )

                                                                        return trimFlowsNames?.includes(
                                                                            cell.column.id
                                                                        ) ? (
                                                                            <TableCell
                                                                                className='h-[53px] !px-0.5 py-1.5 text-center'
                                                                                key={
                                                                                    cell.id
                                                                                }>
                                                                                {trimQuantity[
                                                                                    cell
                                                                                        .column
                                                                                        .id
                                                                                ] || '-'}
                                                                            </TableCell>
                                                                        ) : cell.column
                                                                              .id ===
                                                                          'total' ? (
                                                                            <TableCell
                                                                                className='h-[53px] !px-0.5 py-1.5 text-center'
                                                                                key={
                                                                                    cell.id
                                                                                }>
                                                                                {
                                                                                    totalQuantity
                                                                                }
                                                                            </TableCell>
                                                                        ) : (
                                                                            <TableCell
                                                                                className={cn(
                                                                                    'h-[53px] !px-0.5 py-1.5',
                                                                                    isCuttingComplete
                                                                                        ? commonPinningStyles
                                                                                        : ''
                                                                                )}
                                                                                key={
                                                                                    cell.id
                                                                                }>
                                                                                {flexRender(
                                                                                    cell
                                                                                        .column
                                                                                        .columnDef
                                                                                        .cell,
                                                                                    cell.getContext()
                                                                                )}
                                                                            </TableCell>
                                                                        )
                                                                    })}
                                                            </TableRow>
                                                        )
                                                    })}
                                                </Fragment>
                                            )
                                        }
                                    )}
                                </Fragment>
                            )
                        })
                    ) : isDataFetching ? (
                        <TableSkeleton columnsCount={allColumns.length} />
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={colSpan}
                                className='h-24 pl-4 text-left'>
                                No results
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <TableFooter
                table={table}
                isDataLoading={isDataLoading}
                isDataFetching={isDataFetching}
            />
        </div>
    )
}
