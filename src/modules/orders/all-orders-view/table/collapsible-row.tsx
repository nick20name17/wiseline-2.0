import { type Row, flexRender } from '@tanstack/react-table'
import { useState } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'

import { shouldRenderCell } from '../..'
import { SubTable } from '../sub-table/sub-table'

import { columns } from './columns'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import { TableCell, TableRow } from '@/components/ui/table'
import { useCurrentUserRole } from '@/hooks'
import { cn } from '@/lib/utils'
import type { OrdersData } from '@/store/api/ebms/ebms.types'

interface CollapsibleRowProps {
    row: Row<OrdersData>
}

export const CollapsibleRow: React.FC<CollapsibleRowProps> = ({ row }) => {
    const [category] = useQueryParam('category', StringParam)
    const [open, setOpen] = useState(false)

    const originItems = row.original.origin_items
    const isClientOrWorker = useCurrentUserRole(['client', 'worker'])

    const columnsCount = columns.length

    return (
        <Collapsible
            open={open}
            onOpenChange={setOpen}
            asChild>
            <>
                <TableRow
                    className={cn(
                        'relative odd:bg-secondary/60',
                        open ? 'shadow-top-side-only rounded-t-sm !bg-foreground/5' : ''
                    )}
                    data-state={row.getIsSelected() ? 'selected' : undefined}>
                    {row.getVisibleCells().map((cell, i) =>
                        shouldRenderCell(
                            cell.column.id,
                            category!,
                            isClientOrWorker,
                            i
                        ) ? (
                            <TableCell
                                className='px-0.5 py-1.5 first:w-10 [&div]:h-[53px]'
                                key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </TableCell>
                        ) : null
                    )}
                </TableRow>

                <CollapsibleContent asChild>
                    <tr>
                        <td
                            className='shadow-bottom-side-only max-w-[100vw] rounded-b-sm'
                            colSpan={columnsCount + 1}>
                            <SubTable data={originItems} />
                        </td>
                    </tr>
                </CollapsibleContent>
            </>
        </Collapsible>
    )
}
