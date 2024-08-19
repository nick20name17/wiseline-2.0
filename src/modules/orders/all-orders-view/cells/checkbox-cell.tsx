import type { Row } from '@tanstack/react-table'
import React from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import type { OrdersData } from '@/store/api/ebms/ebms.types'

interface CheckboxCellProps {
    row: Row<OrdersData>
}

export const CheckboxCell: React.FC<CheckboxCellProps> = ({ row }) => {
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
