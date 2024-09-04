import type { Column } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { BooleanParam, useQueryParam } from 'use-query-params'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
    sortable?: boolean
}

export const DataTableColumnHeader = <TData, TValue>({
    column,
    title,
    className,
    sortable = true
}: DataTableColumnHeaderProps<TData, TValue>) => {
    const [grouped] = useQueryParam('grouped', BooleanParam)

    return (
        <Button
            disabled={grouped! || !sortable}
            variant='ghost'
            className={cn(
                'flex w-full items-center justify-between gap-x-2 px-2',
                className
            )}
            onClick={sortable ? column.getToggleSortingHandler() : undefined}>
            {title}

            {column.getIsSorted() ? (
                column.getIsSorted() === 'asc' ? (
                    <ArrowUp className='ml-2 h-4 w-4 flex-shrink-0 text-foreground' />
                ) : (
                    <ArrowDown className='ml-2 h-4 w-4 flex-shrink-0 text-foreground' />
                )
            ) : (
                <ArrowUpDown className='ml-2 h-4 w-4 flex-shrink-0' />
            )}
        </Button>
    )
}
