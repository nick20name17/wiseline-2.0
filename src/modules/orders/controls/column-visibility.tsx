import type { Table } from '@tanstack/react-table'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
    useAddUsersProfilesMutation,
    useGetUsersProfilesQuery
} from '@/store/api/profiles/profiles'

interface ColumnVisibilityProps {
    table: Table<any>
    page: 'orders' | 'items'
    isDataLoading: boolean
}

export const ColumnVisibility: React.FC<ColumnVisibilityProps> = ({
    page,
    table,
    isDataLoading
}) => {
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
                {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .filter(
                        (column) =>
                            column.id !== 'production_date' &&
                            column.id !== 'flow' &&
                            column.id !== 'status'
                    )
                    .map((column) => (
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
                    ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
