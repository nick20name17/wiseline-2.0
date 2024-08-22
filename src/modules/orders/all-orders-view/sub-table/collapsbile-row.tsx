import { type Row, flexRender } from '@tanstack/react-table'
import { useState } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'

import { subColumns } from './sub-columns'
import { SubSubTable } from './sub-sub-table/sub-sub-table'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import { TableCell, TableRow } from '@/components/ui/table'
import { trimOnlyColumns } from '@/config/table'
import { cn } from '@/lib/utils'
import type { EBMSItemsData } from '@/store/api/ebms/ebms.types'

interface CollapsibleRowProps {
    row: Row<EBMSItemsData>
}

export const CollapsibleRow: React.FC<CollapsibleRowProps> = ({ row }) => {
    const [open, setOpen] = useState(false)

    const cuttingItems = row.original.cutting_items

    const [category] = useQueryParam('category', StringParam)

    const colSpan = subColumns.length + 1

    return (
        <Collapsible
            open={open}
            onOpenChange={setOpen}
            asChild>
            <>
                <TableRow
                    className={cn(
                        'relative odd:bg-secondary/60',
                        open ? '!bg-foreground/5' : ''
                    )}
                    data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) =>
                        trimOnlyColumns.includes(cell.column.id) &&
                        category !== 'Trim' ? null : (
                            <TableCell
                                className={cn('px-0.5 py-1.5 first:w-10 [&div]:h-[53px]')}
                                key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </TableCell>
                        )
                    )}
                </TableRow>

                <CollapsibleContent asChild>
                    <tr>
                        <td
                            className='max-w-[100vw] bg-foreground/10'
                            colSpan={colSpan}>
                            <SubSubTable data={cuttingItems} />
                        </td>
                    </tr>
                </CollapsibleContent>
            </>
        </Collapsible>
    )
}
