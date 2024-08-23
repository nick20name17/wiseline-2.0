import { useEffect } from 'react'
import { NumberParam, StringParam, useQueryParam } from 'use-query-params'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const OrdersViewTabs = () => {
    const [view, setView] = useQueryParam('view', StringParam)
    const [_, setOffset] = useQueryParam('offset', NumberParam)
    const [, setOrdering] = useQueryParam('ordering', StringParam)

    useEffect(() => {
        setView(view || 'orders')
    }, [])

    const onValueChange = (value: string) => {
        setOffset(0)
        setView(value)

        if (value === 'lines') {
            setOrdering('order')
        } else if (value === 'orders') {
            setOrdering('-priority')
        } else {
            setOrdering(null)
        }
    }

    return (
        <Tabs
            onValueChange={onValueChange}
            defaultValue={view!}>
            <TabsList className='h-[43px] bg-secondary'>
                <TabsTrigger value='orders'>All Orders</TabsTrigger>
                <TabsTrigger value='lines'>All Lines</TabsTrigger>
                <TabsTrigger value='cut'>Cut View</TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
