import { useEffect } from 'react'
import { NumberParam, StringParam, useQueryParam } from 'use-query-params'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useGetStagesQuery } from '@/store/api/stages/stages'

export const StageFilter = () => {
    const [stage, setStage] = useQueryParam('stage', StringParam)
    const [flow] = useQueryParam('flow', StringParam)
    const [category] = useQueryParam('category', StringParam)
    const [, setOffset] = useQueryParam('offset', NumberParam)

    const {
        data: stages,
        isLoading,
        isFetching
    } = useGetStagesQuery({
        flow: flow ? +flow! : null
    })

    useEffect(() => {
        if (category && category !== 'All' && flow) {
            setStage(stage)
        } else {
            setStage(null)
        }

        return () => {
            setStage(null)
        }
    }, [category])

    const onValueChange = (value: string) => {
        if (value === 'all') {
            setStage(null)
        } else {
            setStage(value)
        }
        setOffset(0)
    }

    if (category !== 'All' && flow && isLoading) {
        return <Skeleton className='h-10 w-40' />
    }

    return category !== 'All' && flow ? (
        <Select
            defaultValue={stage! || 'all'}
            disabled={isLoading || isFetching || !stages?.results?.length}
            onValueChange={onValueChange}>
            <SelectTrigger
                className={cn(
                    '!w-40 text-left font-medium',
                    stage ? 'border-primary text-primary' : ''
                )}>
                <SelectValue placeholder='Select Stage' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem
                    key='all'
                    value='all'>
                    All Stages
                </SelectItem>
                {stages?.results?.map((flow) => (
                    <SelectItem
                        key={flow.id}
                        value={String(flow.id)}>
                        {flow.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    ) : null
}
