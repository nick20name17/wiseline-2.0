import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { StringParam, useQueryParam } from 'use-query-params'

import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip'
import { useCurrentUserRole } from '@/hooks'
import type { Item } from '@/store/api/ebms/ebms.types'
import { useGetFlowsQuery } from '@/store/api/flows/flows'
import {
    useAddItemMutation,
    useAddOrderItemMutation,
    usePatchItemMutation,
    usePatchOrderItemMutation
} from '@/store/api/items/items'
import type { ItemsAddData, ItemsPatchData } from '@/store/api/items/items.types'

interface FlowCellProps {
    item: Item | undefined
    orderId: string
    id: string
}

export const FlowCell: React.FC<FlowCellProps> = ({ item, orderId, id }) => {
    const [category] = useQueryParam('category', StringParam)
    const { data: flows } = useGetFlowsQuery({
        category__prod_type: category === 'All' ? '' : category!
    })

    const flowsData = flows?.results || []

    const { flow, id: itemId } = item || {}
    const flowId = flow?.id

    const [defalutValue, setDefaultValue] = useState(flowId ? String(flowId) : '')

    const [patchItemStatus] = usePatchItemMutation()
    const [patchOrderStatus] = usePatchOrderItemMutation()

    const [addItem] = useAddItemMutation()
    const [addOrderItem] = useAddOrderItemMutation()

    const handlePatchItem = async (data: ItemsPatchData) => {
        try {
            if (category === 'All') {
                await patchOrderStatus(data).unwrap()
            } else {
                await patchItemStatus(data).unwrap()
            }
        } catch (error) {
            toast.error('Error patching item')
        }
    }

    const handleAddItem = async (data: Partial<ItemsAddData>) => {
        try {
            if (category === 'All') {
                await addOrderItem(data).unwrap()
            } else {
                await addItem(data).unwrap()
            }
        } catch (error) {
            toast.error('Error adding item')
        }
    }

    const onValueChange = (value: string) => {
        const flowName = flowsData?.find((flow) => flow.id === +value)?.name

        const data = {
            flow: +value,
            flowName,
            order: orderId
        }

        setDefaultValue(value)

        if (itemId) {
            handlePatchItem({
                id: itemId!,
                data
            })
        } else {
            handleAddItem({
                order: orderId,
                flowName,
                origin_item: id,
                flow: +value
            })
        }
    }

    useEffect(() => {
        setDefaultValue(flowId ? String(flowId) : '')
    }, [flowId])

    const isClient = useCurrentUserRole('client')
    const isWorker = useCurrentUserRole('worker')

    return isClient || (isWorker && !item?.production_date) ? (
        <Button
            variant='ghost'
            className='pointer-events-none w-full text-center font-normal'>
            <span>
                {' '}
                {item?.flow?.name || <span className='opacity-50'>Not selected</span>}
            </span>
        </Button>
    ) : category !== 'All' ? (
        <Select
            // key={defalueValue}
            disabled={!flowsData?.length || isClient}
            defaultValue={defalutValue}
            value={defalutValue}
            onValueChange={onValueChange}>
            <SelectTrigger className='!w-40 text-left'>
                <SelectValue placeholder='Select flow' />
            </SelectTrigger>
            <SelectContent>
                {flowsData?.map((flow) => (
                    <SelectItem
                        key={flow.id}
                        value={String(flow.id)}>
                        {flow.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    ) : (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Select
                        // key={defalueValue}
                        disabled={true}
                        defaultValue={defalutValue}
                        value={defalutValue}
                        onValueChange={onValueChange}>
                        <SelectTrigger className='!w-40 text-left'>
                            <SelectValue placeholder='Select flow' />
                        </SelectTrigger>
                        <SelectContent>
                            {flowsData?.map((flow) => (
                                <SelectItem
                                    key={flow.id}
                                    value={String(flow.id)}>
                                    {flow.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Select a category filter to get flows</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
