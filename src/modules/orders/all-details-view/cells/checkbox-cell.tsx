import type { Row } from '@tanstack/react-table'
import React from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import type { EBMSItemsData } from '@/store/api/ebms/ebms.types'

interface CheckboxCellProps<TData> {
    row: Row<TData>
}

export const CheckboxCell: React.FC<CheckboxCellProps<EBMSItemsData>> = ({ row }) => {
    return (
        <Checkbox
            className='!ml-2 mr-4 border border-muted-foreground data-[state=checked]:bg-muted-foreground'
            checked={row.getIsSelected()}
            value={row.original.id}
            onCheckedChange={(value) => {
                row.toggleSelected(!!value)
            }}
            aria-label='Select row'
        />
    )
}
