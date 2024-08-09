import { ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CollapsibleTrigger } from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'

interface CollapsibleCellProps {
    disabled?: boolean
}

export const CollapsibleCell: React.FC<CollapsibleCellProps> = ({ disabled = false }) => {
    return (
        <CollapsibleTrigger
            asChild
            className='duration-15 transition-transform data-[state=open]:-rotate-90'
            disabled={disabled}>
            <Button
                variant='ghost'
                size='icon'>
                <ChevronDown
                    className={cn(
                        'duration-15 h-4 w-4 transition-transform',
                        disabled ? 'cursor-not-allowed opacity-50' : ''
                    )}
                />
            </Button>
        </CollapsibleTrigger>
    )
}
