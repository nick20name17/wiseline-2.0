import { useEffect } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const Categories = () => {
    const [category = 'Rollforming', setCategory] = useQueryParam('category', StringParam)

    const onValueChange = (value: string) => setCategory(value)

    useEffect(() => {
        setCategory(category || 'Rollforming')
    }, [])

    return (
        <Tabs
            onValueChange={onValueChange}
            defaultValue={category!}>
            <TabsList className='bg-secondary'>
                <TabsTrigger
                    className='flex-1'
                    value='Rollforming'
                    key='Rollforming'>
                    Rollforming
                </TabsTrigger>
                <TabsTrigger
                    className='flex-1'
                    value='Trim'
                    key='Trim'>
                    Trim
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
