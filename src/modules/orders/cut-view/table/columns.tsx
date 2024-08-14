import type { ColumnDef } from '@tanstack/react-table'

import { CheckCell } from '../cell/check-cell'

import type { MergedCuttingItem } from './table'
import { DataTableColumnHeader } from '@/components/shared'

export const columns: ColumnDef<MergedCuttingItem>[] = [
    {
        accessorKey: 'size',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Size'
                className='w-32'
                sortable={false}
            />
        ),
        cell: ({ row }) => (
            <div className='w-32 text-center'>{row.original?.size || '-'}</div>
        )
    },
    {
        accessorKey: 'length',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Length'
                className='w-32'
                sortable={false}
            />
        ),
        cell: ({ row }) => (
            <div className='w-32 text-center'>{row.original?.length || '-'}</div>
        )
    },
    {
        accessorKey: 'total',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Total'
                className='w-28'
                sortable={false}
            />
        )
    },
    {
        accessorKey: 'cutting_complete',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Cutting Complete'
                className='w-40'
                sortable={false}
            />
        ),
        cell: ({ row }) => {
            return (
                <CheckCell
                    autoids={row.original?.autoids}
                    complete={row.original?.cutting_complete}
                />
            )
        }
    }
]
