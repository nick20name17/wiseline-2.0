import { useEffect } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const CutViewTabs = () => {
    const [cutView = 'cut-list-pipeline', setCutView] = useQueryParam(
        'cut-view',
        StringParam
    )
    const onValueChange = (tab: string) => setCutView(tab)

    useEffect(() => {
        return () => {
            setCutView(null)
        }
    }, [])

    useEffect(() => {
        setCutView(cutView)
    }, [cutView])

    return (
        <Tabs
            onValueChange={onValueChange}
            defaultValue={cutView!}
            className='w-fit'>
            <TabsList className='h-10 bg-secondary'>
                <TabsTrigger value='cut-list-pipeline'>Cut List Pipeline</TabsTrigger>
                <TabsTrigger value='orders'>Orders</TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
