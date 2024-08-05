import type { Row } from '@tanstack/react-table'
import { ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CollapsibleTrigger } from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'

interface CollapsibleCellProps<TData> {
    row: Row<TData>
}

export const CollapsibleCell: React.FC<CollapsibleCellProps<any>> = ({ row }) => {
    return (
        <CollapsibleTrigger
            asChild
            className='duration-15 transition-transform data-[state=open]:-rotate-90'
            disabled={!row.original?.origin_items?.length}>
            <Button
                variant='ghost'
                size='icon'>
                <ChevronDown
                    className={cn(
                        'duration-15 h-4 w-4 transition-transform',
                        !row.original.origin_items?.length &&
                            'cursor-not-allowed opacity-50'
                    )}
                />
            </Button>
        </CollapsibleTrigger>
    )
}
