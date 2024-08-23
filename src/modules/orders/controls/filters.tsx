import { useEffect, useMemo } from 'react'
import { BooleanParam, NumberParam, StringParam, useQueryParam } from 'use-query-params'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'

export const Filters = () => {
    const [, setDate] = useQueryParam('date', StringParam)
    const [overdue, setOverdue] = useQueryParam('overdue', BooleanParam)
    const [completed, setCompleted] = useQueryParam('completed', BooleanParam)
    const [scheduled] = useQueryParam('scheduled', BooleanParam)
    const [, setOffset] = useQueryParam('offset', NumberParam)

    const filters = useMemo(() => {
        const newFilters: string[] = []
        if (overdue) newFilters.push('overdue')
        if (completed) newFilters.push('completed')
        return newFilters
    }, [overdue, completed])

    useEffect(() => {
        if (overdue) {
            setDate(null)
        }
    }, [overdue])

    useEffect(() => {
        setOverdue(overdue === false ? null : overdue)
        setCompleted(completed === false ? null : completed)
    }, [completed, overdue])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant='outline'
                    className='max-w-[170px]'>
                    Filters
                    {filters?.length ? (
                        <>
                            <Separator
                                orientation='vertical'
                                className='mx-2'
                            />
                            <Badge className='pointer-events-none max-w-[82px]'>
                                {filters?.length} Selected
                            </Badge>
                        </>
                    ) : null}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                {scheduled === false ? null : (
                    <DropdownMenuCheckboxItem
                        checked={overdue!}
                        onCheckedChange={(value) => {
                            setOverdue(value)
                            setOffset(0)
                        }}>
                        Overdue
                    </DropdownMenuCheckboxItem>
                )}
                <DropdownMenuCheckboxItem
                    checked={completed!}
                    onCheckedChange={(value) => {
                        setCompleted(value)
                        setOffset(0)
                    }}>
                    Completed
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
