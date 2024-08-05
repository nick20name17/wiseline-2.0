import type { Row } from '@tanstack/react-table'
import React from 'react'

import { Checkbox } from '@/components/ui/checkbox'

interface CheckboxCellProps<TData> {
    row: Row<TData>
}

export const CheckboxCell: React.FC<CheckboxCellProps<any>> = ({ row }) => {
    return (
        <Checkbox
            className='!ml-2 mt-[3px]'
            checked={row.getIsSelected()}
            value={row.original.id}
            onCheckedChange={(value) => {
                row.toggleSelected(!!value)
            }}
            aria-label='Select row'
        />
    )
}
