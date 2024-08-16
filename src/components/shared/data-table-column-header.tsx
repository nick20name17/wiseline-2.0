import type { Column } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { BooleanParam, StringParam, useQueryParam } from 'use-query-params'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
    sortable?: boolean
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
    sortable = true
}: DataTableColumnHeaderProps<TData, TValue>) {
    const [grouped] = useQueryParam('grouped', BooleanParam)
    const [view] = useQueryParam('view', StringParam)

    return (
        <Button
            disabled={grouped! || !sortable}
            variant='ghost'
            className={cn(
                '!flex w-full items-center !justify-between gap-x-2 px-2',
                className
            )}
            onClick={sortable ? column.getToggleSortingHandler() : undefined}>
            {title}

            {column.getIsSorted() ? (
                column.getIsSorted() === 'asc' ? (
                    <ArrowUp
                        className={cn(
                            'ml-2 h-4 w-4 flex-shrink-0 text-foreground',
                            grouped && view === 'lines' ? 'hidden' : ''
                        )}
                    />
                ) : (
                    <ArrowDown
                        className={cn(
                            'ml-2 h-4 w-4 flex-shrink-0 text-foreground',
                            grouped && view === 'lines' ? 'hidden' : ''
                        )}
                    />
                )
            ) : (
                <ArrowUpDown
                    className={cn(
                        'ml-2 h-4 w-4 flex-shrink-0',
                        grouped && view === 'lines' ? 'hidden' : ''
                    )}
                />
            )}
        </Button>
    )
}
