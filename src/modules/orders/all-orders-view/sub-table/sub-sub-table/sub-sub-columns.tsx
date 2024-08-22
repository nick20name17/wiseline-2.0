import type { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/shared'
import { Button } from '@/components/ui/button'
import type { EBMSItemData } from '@/store/api/ebms/ebms.types'

export const subSubColumns: ColumnDef<EBMSItemData>[] = [
    {
        accessorKey: 'category',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Prod. category'
                className='!w-40 justify-start text-left'
            />
        ),
        cell: ({ row }) => <div className='pl-4'>{row.original?.category}</div>,
        enableHiding: false
    },
    {
        accessorKey: 'quantity',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Ordered'
                className='!w-28'
            />
        ),
        cell: ({ row }) => <div className='text-center'>{row.original.quantity}</div>,
        sortingFn: 'alphanumeric'
    },
    {
        accessorKey: 'color',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Color'
                className='!w-28'
            />
        ),
        cell: ({ row }) => <div className='text-center'>{row.original.color || '-'}</div>
    },
    {
        accessorKey: 'gauge',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Gauge'
                className='!w-28'
            />
        ),
        cell: ({ row }) => (
            <div className='w-28 text-center'>{row.original.gauge || '-'}</div>
        )
    },
    {
        accessorKey: 'profile',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Profile'
                className='!w-28'
            />
        ),
        cell: ({ row }) => (
            <div className='text-center'>{row.original.profile || '-'}</div>
        )
    },
    {
        accessorKey: 'customer',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Customer'
                className='!w-64 justify-start text-left'
            />
        ),
        cell: ({ row }) => <div className='w-64 pl-4'>{row.original.customer || '-'}</div>
    },
    {
        accessorKey: 'id_inven',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='ID'
                className='!w-28 justify-start text-left'
            />
        ),
        cell: ({ row }) => <div className='w-28 pl-4'>{row.original?.id_inven}</div>
    },
    {
        accessorKey: 'bends',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Bends'
                className='!w-28'
            />
        ),
        cell: ({ row }) => <div className='text-center'>{row.original?.bends}</div>,
        sortingFn: 'alphanumeric'
    },
    {
        accessorKey: 'weight',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Weight'
                className='!w-28 justify-start text-left'
            />
        ),
        cell: ({ row }) => <div className='text-center'>{row.original?.weight}</div>,
        sortingFn: 'alphanumeric'
    },
    {
        accessorKey: 'width',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Width'
                className='!w-28'
            />
        ),
        cell: ({ row }) => <div className='text-center'>{row.original?.width || '-'}</div>
    },
    {
        accessorKey: 'length',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Length'
                className='!w-28'
            />
        ),
        cell: ({ row }) => (
            <div className='text-center'>{row.original?.length || '-'}</div>
        )
    },
    {
        accessorKey: 'description',
        header: () => (
            <Button
                variant='ghost'
                className='!w-64 justify-start text-left'>
                Description
            </Button>
        ),
        cell: ({ row }) => <div className='w-64 pl-4'>{row.original?.description}</div>
    }
]
