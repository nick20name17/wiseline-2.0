import type { ColumnDef } from '@tanstack/react-table'

import { CheckCell } from '../cell/check-cell'

import type { MergedCuttingItem } from './table'
import { DataTableColumnHeader } from '@/components/shared'
import { Button } from '@/components/ui/button'

export const columns: ColumnDef<MergedCuttingItem>[] = [
    {
        accessorKey: 'size',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Size'
                className='w-32'
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
            />
        )
    },
    {
        accessorKey: 'cutting_complete',
        header: () => (
            <div className='flex w-full justify-center'>
                <Button
                    className='w-40 hover:bg-background'
                    variant='ghost'>
                    Cutting Complete
                </Button>
            </div>
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
