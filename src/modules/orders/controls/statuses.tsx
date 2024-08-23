import { BooleanParam, NumberParam, StringParam, useQueryParam } from 'use-query-params'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const Statuses = () => {
    const [category] = useQueryParam('category', StringParam)
    const [scheduled, setScheduled] = useQueryParam('scheduled', BooleanParam)
    const [_, setOverdue] = useQueryParam('overdue', BooleanParam)
    const [, setOffset] = useQueryParam('offset', NumberParam)

    const onValueChange = (tab: string) => {
        setScheduled(tab === 'all' ? undefined : tab === 'scheduled')
        setOffset(0)
    }

    const getDefaultValue = () => {
        switch (scheduled) {
            case false:
                setOverdue(null)
                return 'unscheduled'
            case true:
                return 'scheduled'
            default:
                return 'all'
        }
    }

    return (
        <Tabs
            key={category! + scheduled!}
            onValueChange={onValueChange}
            defaultValue={getDefaultValue()}>
            <TabsList className='bg-secondary'>
                <TabsTrigger value='all'>All</TabsTrigger>
                <TabsTrigger value='unscheduled'>Unscheduled</TabsTrigger>
                <TabsTrigger value='scheduled'>Scheduled</TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
