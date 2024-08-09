import type { ColumnDef } from '@tanstack/react-table'
import { BooleanParam, useQueryParam } from 'use-query-params'

import { CommentsCell } from '../../cells/comments-cell'
import { FlowCell } from '../../cells/flow-cell'
import { StatusCell } from '../../cells/status-cell'
import { CheckboxCell } from '../cells/checkbox-cell'
import { CheckboxHeader } from '../cells/checkbox-header'
import { DatePickerCell } from '../cells/date-picker-cell'

import { DataTableColumnHeader } from '@/components/shared'
import { Button } from '@/components/ui/button'
import type { EBMSItemsData } from '@/store/api/ebms/ebms.types'

export const columns: ColumnDef<EBMSItemsData>[] = [
    {
        id: 'select',
        header: ({ table }) => <CheckboxHeader table={table} />,
        cell: ({ row }) => <CheckboxCell row={row} />,
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: 'flow',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Flow/Machine'
                className='!w-40'
            />
        ),
        cell: ({ row }) => {
            return (
                <FlowCell
                    key={row?.original?.id}
                    id={row?.original?.id}
                    item={row.original.item!}
                    orderId={row.original.origin_order}
                />
            )
        }
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Status'
                className='!w-48'
            />
        ),
        cell: ({ row }) => (
            <StatusCell
                key={row?.original?.id}
                item={row.original?.item}
                invoice={row.original?.order}
                originOrderId={row.original?.origin_order}
            />
        )
    },
    {
        accessorKey: 'production_date',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Prod. date'
                className='!w-40'
            />
        ),
        cell: ({ row }) => (
            <DatePickerCell
                key={row.original?.id}
                originItem={row.original}
            />
        )
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
        cell: ({ row }) => (
            <div className='!w-28 text-center'>{row.original.quantity || '-'}</div>
        )
    },
    {
        accessorKey: 'shipped',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Shipped'
                className='!w-28'
            />
        ),
        cell: ({ row }) => (
            <div className='w-28 text-center'>{row.original.shipped || '-'}</div>
        )
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
        cell: ({ row }) => (
            <div className='w-28 text-center'>{row.original.color || '-'}</div>
        )
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
            <div className='w-28 text-center'>{row.original.profile || '-'}</div>
        )
    },
    {
        accessorKey: 'id_inven',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='ID'
                className='!w-24 justify-start text-left'
            />
        ),
        cell: ({ row }) => <div className='!w-24 pl-4'>{row.original?.id_inven}</div>
    },
    {
        accessorKey: 'weight',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Weight'
                className='!w-28'
            />
        ),
        cell: ({ row }) => (
            <div className='w-28 text-center'>{row.original.weight || '-'}</div>
        )
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
        header: () => {
            const [groupedView] = useQueryParam('grouped', BooleanParam)

            return (
                <Button
                    disabled={groupedView!}
                    variant='ghost'
                    className='!w-64 justify-start text-left'>
                    Description
                </Button>
            )
        },
        cell: ({ row }) => <div className='!w-64 pl-4'>{row.original?.description}</div>
    },
    {
        accessorKey: 'comments',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Notes'
                className='!w-32'
            />
        ),
        cell: ({ row }) => <CommentsCell originItem={row.original} />
    }
]
