import { type ColumnDef } from '@tanstack/react-table'

import { CheckCell } from '../cells/check-cell'
import { CheckboxCell } from '../cells/checkbox-cell'
import { CheckboxHeader } from '../cells/checkbox-header'
import { CollapsibleCell } from '../cells/collapsible-cell'
import { DatePickerCell } from '../cells/date-picker-cell'
import { PriorityCell } from '../cells/priority-cell'
import { SalesOrderCell } from '../cells/sales-order-cell'
import { ShipDatePickerCell } from '../cells/ship-date-picker'

import { DataTableColumnHeader } from '@/components/shared'
import { Button } from '@/components/ui/button'
import type { OrdersData } from '@/store/api/ebms/ebms.types'

export const columns: ColumnDef<OrdersData>[] = [
    {
        id: 'select',
        header: ({ table }) => <CheckboxHeader table={table} />,
        cell: ({ row }) => <CheckboxCell row={row} />,
        enableSorting: false,
        enableHiding: false
    },
    {
        id: 'arrow',
        header: () => (
            <Button
                tabIndex={-1}
                variant='ghost'
                className='pointer-events-none w-full'>
                <div className='h-4 w-4 flex-shrink-0' />
            </Button>
        ),
        cell: ({ row }) => <CollapsibleCell row={row} />,
        enableHiding: false,
        enableSorting: false
    },
    {
        accessorKey: 'invoice',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Invoice'
                className='w-[103px]'
            />
        ),
        cell: ({ row }) => (
            <div className='w-[103px] text-center'>{row.original?.invoice}</div>
        )
    },
    {
        accessorKey: 'customer',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Customer'
                className='w-64 justify-start text-left'
            />
        ),
        cell: ({ row }) => (
            <div className='w-64 pl-4 pr-1'>{row.original?.customer || '-'}</div>
        )
    },
    {
        accessorKey: 'priority',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Prio.'
                className='!w-28'
            />
        ),
        cell: ({ row }) => <PriorityCell order={row.original} />
    },
    {
        accessorKey: 'packages',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Pckgs.'
                className='w-[90px]'
            />
        ),
        cell: ({ row }) => (
            <SalesOrderCell
                key={row.original?.id}
                name='packages'
                invoice={row.original?.invoice!}
                value={row.original?.sales_order?.packages!}
                itemId={row.original?.sales_order?.id}
                orderId={row.original.id}
            />
        )
    },
    {
        accessorKey: 'location',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Loc.'
                className='w-[90px]'
            />
        ),
        cell: ({ row }) => (
            <SalesOrderCell
                key={row.original?.id}
                name='location'
                invoice={row.original?.invoice!}
                value={row.original?.sales_order?.location!}
                itemId={row.original?.sales_order?.id}
                orderId={row.original.id}
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
        cell: ({ row }) => <DatePickerCell order={row.original} />
    },
    {
        accessorKey: 'ship_date',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Ship date'
                className='!w-40'
            />
        ),
        cell: ({ row }) => <ShipDatePickerCell order={row.original} />
    },
    {
        accessorKey: 'assigned',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='ASGD'
                className='!w-20'
            />
        ),
        cell: ({ row }) => (
            <CheckCell
                invoice={row.original.invoice}
                itemId={row.original?.sales_order?.id}
                orderId={row.original.id}
                name='assigned'
                checked={row.original?.sales_order?.assigned || false}
            />
        )
    },
    {
        accessorKey: 'release_to_production',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='RTP'
                className='!w-20'
            />
        ),
        cell: ({ row }) => (
            <CheckCell
                invoice={row.original.invoice}
                itemId={row.original?.sales_order?.id}
                orderId={row.original.id}
                name='release_to_production'
                disabled={!row.original.sales_order?.production_date}
                checked={row.original?.sales_order?.release_to_production || false}
            />
        )
    },
    {
        accessorKey: 'cutting_complete',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='CC'
                className='!w-20'
            />
        ),
        cell: ({ row }) => (
            <CheckCell
                invoice={row.original.invoice}
                itemId={row.original?.sales_order?.id}
                orderId={row.original.id}
                name='cutting_complete'
                checked={row.original?.sales_order?.cutting_complete || false}
            />
        )
    },
    {
        accessorKey: 'c_name',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Name'
                className='w-64 max-w-64 justify-start text-left'
            />
        ),
        cell: ({ row }) => <div className='w-64 pl-4'>{row.original.c_name || '-'}</div>
    },
    {
        accessorKey: 'c_city',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='City'
                className='w-32'
            />
        ),
        cell: ({ row }) => (
            <div className='w-32 text-center'>{row.original.c_city || '-'}</div>
        )
    },
    {
        accessorKey: 'count_items',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Line Items'
                className='w-28'
            />
        ),
        cell: ({ row }) => (
            <div className='w-28 text-center'>{row.original?.count_items}</div>
        )
    }
]
