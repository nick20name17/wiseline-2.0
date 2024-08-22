import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table'
import { StringParam, useQueryParam } from 'use-query-params'

import { CollapsibleRow } from './collapsbile-row'
import { subColumns } from './sub-columns'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { trimOnlyColumns } from '@/config/table'
import type { EBMSItemsData } from '@/store/api/ebms/ebms.types'

interface SubTableProps {
    data: EBMSItemsData[]
}

export const SubTable: React.FC<SubTableProps> = ({ data }) => {
    const subTable = useReactTable({
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        data,
        columns: subColumns,
        autoResetPageIndex: false
    })

    const [category] = useQueryParam('category', StringParam)

    const originItemsRows = subTable.getRowModel().rows

    return (
        <Table>
            <TableHeader>
                {subTable.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) =>
                            trimOnlyColumns.includes(header.column.id) &&
                            category !== 'Trim' ? null : (
                                <TableHead
                                    key={header.id}
                                    className='px-0.5 py-1.5'>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </TableHead>
                            )
                        )}
                    </TableRow>
                ))}
            </TableHeader>

            <TableBody>
                {originItemsRows.map((row) =>
                    category === 'Trim' ? (
                        <CollapsibleRow
                            key={row?.original?.id}
                            row={row}
                        />
                    ) : (
                        <TableRow key={row?.original?.id}>
                            {row.getVisibleCells().map((cell) => {
                                return trimOnlyColumns.includes(cell.column.id) &&
                                    category !== 'Trim' ? null : (
                                    <TableCell
                                        className='px-0.5 py-1.5'
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
                )}
            </TableBody>
        </Table>
    )
}
