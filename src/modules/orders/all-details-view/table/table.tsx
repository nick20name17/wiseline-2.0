import {
    type Row,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table'
import React, { Fragment, useEffect, useLayoutEffect, useRef } from 'react'
import { BooleanParam, StringParam, useQueryParam } from 'use-query-params'

import { TableFooter } from './table-footer'
import { TableSkeleton } from '@/components/shared'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { shouldRenderCell } from '@/config/table'
import { useCurrentUserRole, useMatchMedia, useSorting, useTableScroll } from '@/hooks'
import {
    useColumnDragDrop,
    useColumnOrder,
    useColumnVisibility
} from '@/hooks/use-column-controls'
import type { EBMSItemsData } from '@/store/api/ebms/ebms.types'
import {
    useAddUsersProfilesMutation,
    useGetUsersProfilesQuery
} from '@/store/api/profiles/profiles'
import type { DataTableProps } from '@/types/table'
import { groupBy } from '@/utils'

export const AllDetailsViewTable: React.FC<
    DataTableProps<EBMSItemsData, EBMSItemsData>
> = ({ columns, data, isDataLoading, isDataFetching, pageCount }) => {
    const [grouped] = useQueryParam('grouped', BooleanParam)
    const [category] = useQueryParam('category', StringParam)
    const [scheduled] = useQueryParam('scheduled', BooleanParam)

    const { data: usersProfilesData } = useGetUsersProfilesQuery()

    const { columnOrder } = useColumnOrder(usersProfilesData!, 'items')
    const { columnVisibility } = useColumnVisibility(usersProfilesData!, 'items', columns)

    const [addUsersProfiles] = useAddUsersProfilesMutation()

    const { sorting, setSorting } = useSorting([
        {
            id: 'order',
            desc: false
        }
    ])

    const table = useReactTable({
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        data,
        columns,
        pageCount,
        manualPagination: true,
        manualSorting: true,
        autoResetPageIndex: false,
        enableHiding: true,
        state: {
            sorting,
            columnVisibility,
            columnOrder
        }
    })

    const { onDragStart, onDrop } = useColumnDragDrop(table, 'items', addUsersProfiles)

    const tableRef = useRef<HTMLTableElement>(null)

    const { isTablet } = useMatchMedia()

    useTableScroll({ tableRef, enableScroll: !isTablet })

    const isClientOrWorker = useCurrentUserRole(['client', 'worker'])

    useLayoutEffect(() => {
        if (grouped) {
            setSorting([{ id: 'order', desc: false }])
        }
    }, [grouped])

    useEffect(() => {
        table.setRowSelection({})
    }, [category, scheduled])

    const columnsCount = columns?.length || 0

    const groupByOrder = groupBy(table?.getRowModel()?.rows || [], 'original.order')

    const onCheckedChange = (value: boolean, group: [string, Row<EBMSItemsData>[]]) => {
        const currentGroup = groupByOrder.filter((gr) => gr[0] === group[0])
        const currentGroupIds = currentGroup[0][1].map((obj) => obj.id)

        const obj = currentGroupIds
            .map((obj) => ({ [obj]: true }))
            .reduce((acc, val) => ({ ...acc, ...val }), {})

        if (value) {
            table.setRowSelection((prev) => ({
                ...prev,
                ...obj
            }))
        } else {
            table.setRowSelection((prev) => {
                const newSelection = { ...prev }
                currentGroupIds.forEach((id) => {
                    if (newSelection[id]) {
                        delete newSelection[id]
                    }
                })
                return newSelection
            })
        }
    }

    return (
        <div className='mt-4 rounded-md'>
            <Table
                ref={tableRef}
                containerClassname='h-fit overflow-y-auto'>
                <TableHeader className='sticky top-0 z-10 bg-background'>
                    {isDataLoading ? (
                        <TableRow className='p-0'>
                            <TableCell
                                colSpan={columnsCount}
                                className='h-[41px] !px-0 py-1.5'>
                                <Skeleton className='h-[41px] w-full' />
                            </TableCell>
                        </TableRow>
                    ) : (
                        table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header, i) => {
                                    const shouldRender = shouldRenderCell(
                                        header.column.id,
                                        category!,
                                        isClientOrWorker,
                                        i
                                    )

                                    if (!shouldRender) {
                                        return null
                                    }

                                    if (header.column.id === 'order' && grouped) {
                                        return null
                                    }

                                    return (
                                        <TableHead
                                            draggable={
                                                !table.getState().columnSizingInfo
                                                    .isResizingColumn &&
                                                header.id !== 'flow' &&
                                                header.id !== 'status' &&
                                                header.id !== 'production_date'
                                            }
                                            className='w-2 !px-0.5 last:w-auto'
                                            data-column-index={header.index}
                                            onDragStart={onDragStart}
                                            onDragOver={(e) => {
                                                e.stopPropagation()
                                                e.preventDefault()
                                            }}
                                            onDrop={onDrop}
                                            colSpan={header.colSpan}
                                            key={header.id}>
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
                    {isDataLoading ? (
                        <TableSkeleton columnsCount={columns.length} />
                    ) : table.getRowModel().rows?.length ? (
                        grouped ? (
                            groupByOrder.map((group) =>
                                group[1].map((row, index) => {
                                    const isIndeterminate = group[1].some((row) =>
                                        row.getIsSelected()
                                    )
                                        ? group[1].every((row) => row.getIsSelected())
                                            ? true
                                            : 'indeterminate'
                                        : false

                                    return (
                                        <Fragment key={row.original?.id}>
                                            {index === 0 && (
                                                <TableRow className='!p-0'>
                                                    <TableCell
                                                        className='!p-0'
                                                        colSpan={columnsCount}>
                                                        <Badge
                                                            variant='secondary'
                                                            className='!m-0 w-full !rounded-none py-2'>
                                                            <Checkbox
                                                                className='mr-4'
                                                                checked={isIndeterminate}
                                                                value={row.id}
                                                                onCheckedChange={(
                                                                    value
                                                                ) => {
                                                                    onCheckedChange(
                                                                        !!value,
                                                                        group
                                                                    )
                                                                }}
                                                                aria-label='Select row'
                                                            />
                                                            <div className='pl-4'>
                                                                {group[0]} |{' '}
                                                                {
                                                                    group[1][0].original
                                                                        ?.customer
                                                                }
                                                            </div>
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                            <TableRow
                                                className='odd:bg-secondary/60'
                                                data-state={
                                                    row.getIsSelected() && 'selected'
                                                }>
                                                {row.getVisibleCells().map((cell, i) => {
                                                    const shouldRender = shouldRenderCell(
                                                        cell.column.id,
                                                        category!,
                                                        isClientOrWorker,
                                                        i
                                                    )

                                                    if (!shouldRender) {
                                                        return null
                                                    }

                                                    if (
                                                        cell.column.id === 'order' &&
                                                        grouped
                                                    ) {
                                                        return null
                                                    }

                                                    return (
                                                        <TableCell
                                                            className='h-[53px] !px-0.5 py-1.5'
                                                            key={cell.id}>
                                                            {flexRender(
                                                                cell.column.columnDef
                                                                    .cell,
                                                                cell.getContext()
                                                            )}
                                                        </TableCell>
                                                    )
                                                })}
                                            </TableRow>
                                        </Fragment>
                                    )
                                })
                            )
                        ) : (
                            table.getRowModel().rows.map((row) => {
                                return (
                                    <TableRow
                                        key={row.original?.id}
                                        className='odd:bg-secondary/60'
                                        data-state={row.getIsSelected() && 'selected'}>
                                        {row.getVisibleCells().map((cell, i) => {
                                            const shouldRender = shouldRenderCell(
                                                cell.column.id,
                                                category!,
                                                isClientOrWorker,
                                                i
                                            )

                                            if (!shouldRender) {
                                                return null
                                            }

                                            return (
                                                <TableCell
                                                    className='h-[53px] !px-0.5 py-1.5'
                                                    key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })
                        )
                    ) : isDataFetching ? (
                        <TableSkeleton columnsCount={columns.length} />
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columnsCount}
                                className='h-24 pl-4 text-left'>
                                No results
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <TableFooter
                isDataFetching={isDataFetching}
                isDataLoading={isDataLoading}
                pageCount={pageCount}
                table={table}
            />
        </div>
    )
}
