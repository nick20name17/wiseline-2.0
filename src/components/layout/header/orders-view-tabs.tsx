import { useEffect } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const OrdersViewTabs = () => {
    const [view = 'orders', setView] = useQueryParam('view', StringParam)
    const onValueChange = (value: string) => setView(value)

    useEffect(() => {
        setView(view)
    }, [])

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
