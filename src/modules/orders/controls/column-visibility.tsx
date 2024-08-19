import type { Table } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { alwaysVisibleColumns, trimOnlyColumns } from '@/config/table'
import type { EBMSItemsData, OrdersData } from '@/store/api/ebms/ebms.types'
import {
    useAddUsersProfilesMutation,
    useGetUsersProfilesQuery
} from '@/store/api/profiles/profiles'

type OrdersColumnVisibilityProps = {
    page: 'orders'
    table: Table<OrdersData>
    isDataLoading: boolean
}

type ItemsColumnVisibilityProps = {
    page: 'items'

    table: Table<EBMSItemsData>
    isDataLoading: boolean
}

type ColumnVisibilityProps = OrdersColumnVisibilityProps | ItemsColumnVisibilityProps

export const ColumnVisibility: React.FC<ColumnVisibilityProps> = ({
    page,
    table,
    isDataLoading
}) => {
    const [category] = useQueryParam('category', StringParam)

    const [visibleColumns, setVisibleColumns] = useState<string[]>([])

    const [addUsersProfiles] = useAddUsersProfilesMutation()
    const { data: usersProfilesData } = useGetUsersProfilesQuery()

    const onCheckedChange = (column: string, value: boolean) => {
        const newVisibleColumns = value
            ? [...visibleColumns, column]
            : visibleColumns.filter((col) => col !== column)

        addUsersProfiles({
            page,
            show_columns: newVisibleColumns.join(',')
        })
    }

    const toggleAllColumns = (value: boolean) => {
        const tableColumns = table
            .getAllColumns()
            .map((column) => column.id)
            .filter((col) => col !== 'select' && col !== 'arrow')

        const newVisibleColumns = value ? tableColumns : []

        tableColumns.forEach((col) => {
            table?.getColumn(col!)?.toggleVisibility(value!)
        })

        addUsersProfiles({
            page,
            show_columns: newVisibleColumns.join(',')
        })
        setVisibleColumns(newVisibleColumns)
    }

    const profiles = usersProfilesData?.find((profile) => profile.page === page)
    const showColumns = profiles?.show_columns?.split(',')

    useEffect(() => {
        if (showColumns) {
            setVisibleColumns(showColumns)
        } else {
            const tableColumns = table
                .getAllColumns()
                .map((column) => column.id)
                .filter((col) => col !== 'select' && col !== 'arrow')

            setVisibleColumns(tableColumns)
        }
    }, [usersProfilesData])

    const hiddenColumnsLength = page === 'items' ? 1 : 2

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    disabled={isDataLoading}
                    variant='outline'
                    className='ml-auto'>
                    Columns
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuCheckboxItem
                    key='toggle-all'
                    checked={
                        visibleColumns.length ===
                        table.getAllColumns().length - hiddenColumnsLength
                    }
                    onCheckedChange={(value) => toggleAllColumns(!!value)}>
                    Check All
                </DropdownMenuCheckboxItem>
                {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .filter((column) => !alwaysVisibleColumns.includes(column.id))
                    .map((column) =>
                        trimOnlyColumns.includes(column.id) &&
                        category !== 'Trim' ? null : (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className='capitalize'
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => {
                                    column.toggleVisibility(!!value)
                                    onCheckedChange(column.id, !!value)
                                }}>
                                {column.id.replace(/c_/g, '').replace(/_/g, ' ')}
                            </DropdownMenuCheckboxItem>
                        )
                    )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
