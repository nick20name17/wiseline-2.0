import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table'
import { StringParam, useQueryParam } from 'use-query-params'

import { subSubColumns } from './sub-sub-columns'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import type { OriginItem } from '@/store/api/ebms/ebms.types'

interface SubSubTableProps {
    data: OriginItem[]
}

export const SubSubTable: React.FC<SubSubTableProps> = ({ data }) => {
    const subSubTable = useReactTable({
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        data,
        columns: subSubColumns,
        paginateExpandedRows: false,
        autoResetPageIndex: false
    })

    const trimOnlyColumns = [
        'gauge',
        'assigned',
        'release_to_production',
        'cutting_complete'
    ]

    const [category] = useQueryParam('category', StringParam)

    return (
        <Table>
            <TableHeader>
                {subSubTable.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) =>
                            trimOnlyColumns.includes(header.id) &&
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
                {subSubTable.getRowModel().rows.map((row) => (
                    <TableRow key={row?.original?.id}>
                        {row.getVisibleCells().map((cell) =>
                            trimOnlyColumns.includes(cell.column.id) &&
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
                        )}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
