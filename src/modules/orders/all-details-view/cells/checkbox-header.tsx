import type { Table } from '@tanstack/react-table'

import { MultipatchPopover } from '../controls/multipatch-popover'

import { Checkbox } from '@/components/ui/checkbox'
import type { EBMSItemsData } from '@/store/api/ebms/ebms.types'

interface CheckboxHeaderProps {
    table: Table<EBMSItemsData>
}

export const CheckboxHeader: React.FC<CheckboxHeaderProps> = ({ table }) => {
    return (
        <div className='w-10 pt-1'>
            <Checkbox
                className='ml-2'
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label='Select all'
            />
            <MultipatchPopover table={table} />
        </div>
    )
}
