import { useEffect } from 'react'
import { BooleanParam, useQueryParam } from 'use-query-params'

import { Toggle } from '@/components/ui/toggle'

export const StatusesFilter = () => {
    const [cuttingComplete = true, setCuttingComplete] = useQueryParam(
        'cutting_complete',
        BooleanParam
    )

    const onCuttingComplete = (pressed: boolean) => {
        setCuttingComplete(pressed)
    }

    useEffect(() => {
        setCuttingComplete(cuttingComplete)
    }, [])

    return (
        <Toggle
            pressed={cuttingComplete!}
            onPressedChange={onCuttingComplete}
            className='data=[state=on]:border data-[state=on]:border-primary data-[state=on]:bg-background data-[state=on]:text-primary'
            variant='outline'
            aria-label='Toggle grouped'>
            {cuttingComplete ? ' Active' : 'Archived'}
        </Toggle>
    )
}
