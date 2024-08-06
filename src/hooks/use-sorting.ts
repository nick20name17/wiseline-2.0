import type { SortingState } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'

interface SortingProps {
    defaultValues: SortingState
}

export const useSorting = ({ defaultValues }: SortingProps) => {
    // const [view] = useQueryParam('view', StringParam)
    const [ordering, setOrdering] = useQueryParam('ordering', StringParam)

    const getInitialSorting = () => {
        if (ordering) {
            return ordering.split(',').map((sort) => ({
                id: sort.replace('-', ''),
                desc: sort.startsWith('-')
            }))
        }

        return defaultValues
    }

    const [sorting, setSorting] = useState(() => getInitialSorting())

    useEffect(() => {
        const currentSortingTerms = sorting
            .map((sort) => (sort.desc ? `-${sort.id}` : sort.id))
            .join(',')

        setOrdering(currentSortingTerms || null)
    }, [sorting])

    return { sorting, setSorting }
}
