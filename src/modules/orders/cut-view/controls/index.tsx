import { useRef } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'

import { Colorfilter } from './color-filter'
import { CutViewTabs } from './tabs'
import { useIsSticky } from '@/hooks/use-is-sticky'
import { cn } from '@/lib/utils'

export const Controls = () => {
    const [cutView] = useQueryParam('cut-view', StringParam)

    const ref = useRef<HTMLDivElement>(null)

    const isSticky = useIsSticky(ref)

    return (
        <div
            ref={ref}
            id='cutting-view-controls'
            className={cn(
                'flex items-center justify-between gap-x-4 py-2 transition-all max-md:sticky max-md:left-0 max-md:top-0 max-md:z-[1000] max-md:mb-1 max-md:bg-background max-sm:w-full',
                isSticky ? 'border-b bg-background py-2 shadow-sm' : ''
            )}>
            <CutViewTabs />
            {cutView === 'orders' ? null : <Colorfilter />}
        </div>
    )
}
