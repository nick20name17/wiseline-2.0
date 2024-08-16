import type { Table } from '@tanstack/react-table'

import { MultipatchPopover } from '../controls/multipatch-popover'

import { Checkbox } from '@/components/ui/checkbox'

interface CheckboxHeaderProps<TData> {
    table: Table<TData>
}

export const CheckboxHeader: React.FC<CheckboxHeaderProps<any>> = ({ table }) => {
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
