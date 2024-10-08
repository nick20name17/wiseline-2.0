import { useEffect, useRef } from 'react'
import { BooleanParam, useQueryParam } from 'use-query-params'

import { CategoryFilter } from '../../controls/category-filter'
import { Filters } from '../../controls/filters'
import { FlowFilter } from '../../controls/flow-filter'
import { StageFilter } from '../../controls/stage-filter'
import { Statuses } from '../../controls/statuses'

import { SearchBar } from '@/components/shared'
import { Toggle } from '@/components/ui/toggle'
import { useIsSticky, useMatchMedia } from '@/hooks'
import { cn } from '@/lib/utils'

export const TableControls = () => {
    const ref = useRef<HTMLDivElement>(null)

    const { isTablet } = useMatchMedia()

    const [grouped, setGrouped] = useQueryParam('grouped', BooleanParam)

    const handleSetGrouped = (value: boolean) => setGrouped(value ? true : null)

    const isSticky = useIsSticky(ref)

    useEffect(() => {
        return () => {
            setGrouped(null)
        }
    }, [])

    return isTablet ? (
        <>
            <div className='flex flex-wrap items-center justify-between gap-4 max-sm:w-full'>
                <Statuses />
                <SearchBar />
            </div>

            <div
                ref={ref}
                className={cn(
                    'sticky left-0 top-0 z-[1000] mb-1 mt-4 flex w-full items-center gap-4 transition-all max-sm:w-full',
                    isSticky ? 'border-b bg-background py-2 shadow-sm' : ''
                )}>
                <CategoryFilter />

                <FlowFilter />
                <StageFilter />
                <Filters />
                <Toggle
                    pressed={!!grouped}
                    onPressedChange={handleSetGrouped}
                    className='data=[state=on]:border data-[state=on]:border-primary data-[state=on]:bg-background data-[state=on]:text-primary'
                    variant='outline'
                    aria-label='Toggle grouped'>
                    Grouped
                </Toggle>
            </div>
        </>
    ) : (
        <div
            className='flex w-full flex-wrap items-start justify-between gap-4'
            id='order-statuses'>
            <div className='flex flex-wrap items-center justify-between gap-4 max-sm:w-full'>
                <Statuses />
                <SearchBar />
            </div>

            <div className='flex items-center gap-x-4'>
                <CategoryFilter />
                <FlowFilter />
                <StageFilter />
                <Filters />
                <Toggle
                    pressed={!!grouped}
                    onPressedChange={handleSetGrouped}
                    className='data=[state=on]:border data-[state=on]:border-primary data-[state=on]:bg-background data-[state=on]:text-primary'
                    variant='outline'
                    aria-label='Toggle grouped'>
                    Grouped
                </Toggle>
            </div>
        </div>
    )
}
