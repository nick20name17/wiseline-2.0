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
import { useGetFlowsQuery } from '@/store/api/flows/flows'

export const FlowFilter = () => {
    const [category] = useQueryParam('category', StringParam)
    const [_, setStage] = useQueryParam('stage', StringParam)
    const [flow, setFlow] = useQueryParam('flow', StringParam)
    const [, setOffset] = useQueryParam('offset', NumberParam)

    const onValueChange = (value: string) => {
        if (value === 'all') {
            setFlow(null)
            setStage(null)
        } else {
            setFlow(value)
        }
        setOffset(0)
    }

    const {
        data: flowsData,
        isFetching,
        isLoading
    } = useGetFlowsQuery({
        category__prod_type: category === 'All' ? '' : category!
    })

    useEffect(() => {
        if (category && category !== 'All') {
            setFlow(flow)
        } else {
            setFlow(null)
        }

        return () => {
            setFlow(null)
        }
    }, [category])

    if (category !== 'All' && isLoading) {
        return <Skeleton className='h-10 w-40' />
    }

    return category === 'All' ? null : (
        <Select
            key={flow! + category}
            defaultValue={flow || 'all'}
            disabled={isLoading || isFetching || !flowsData?.results?.length}
            onValueChange={onValueChange}>
            <SelectTrigger
                className={cn(
                    '!w-40 text-left font-medium',
                    flow ? 'border-primary text-primary' : ''
                )}>
                <SelectValue placeholder='Select flow' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem
                    key='all'
                    value='all'>
                    All flows
                </SelectItem>
                {flowsData?.results?.map((flow) => (
                    <SelectItem
                        key={flow.id}
                        value={String(flow.id)}>
                        {flow.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
