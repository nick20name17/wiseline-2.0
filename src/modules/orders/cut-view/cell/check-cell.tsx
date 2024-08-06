import { CheckCircle2, Circle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Toggle } from '@/components/ui/toggle'
import { cn } from '@/lib/utils'
import { usePatchItemCuttingCompleteMutation } from '@/store/api/items/items'
import { useAppSelector } from '@/store/hooks/hooks'
import { selectUser } from '@/store/slices/auth'
import { isErrorWithMessage } from '@/utils/is-error-with-message'

interface CheckCellProps {
    autoids: string[]
    complete: boolean
}

export const CheckCell: React.FC<CheckCellProps> = ({ autoids, complete }) => {
    const [patchItemCuttingComplete, { isLoading }] =
        usePatchItemCuttingCompleteMutation()

    const successToast = (autoid: string) => {
        toast.success(`Cutting complete of ${autoid}`, {
            description: 'Updated successfully'
        })
    }

    const errorToast = (autoid: string, description: string) => {
        toast.error(`Cutting complete of ${autoid}`, {
            description
        })
    }

    const handlePatchSalesOrder = async (complete: boolean, autoid: string) => {
        try {
            await patchItemCuttingComplete({
                autoid,
                data: {
                    cutting_complete: complete
                }
            })
                .unwrap()
                .then(() => successToast(autoid))
        } catch (error) {
            const isErrorMessage = isErrorWithMessage(error)

            const errorMessage = isErrorMessage
                ? error.data.detail
                : 'Something went wrong'

            errorToast(autoid, errorMessage)
        }
    }

    const [isChecked, setIsChecked] = useState(complete)

    useEffect(() => {
        setIsChecked(complete)
    }, [complete])

    const onPressChanage = (checked: boolean) => {
        setIsChecked(checked)

        autoids.forEach((autoid) => handlePatchSalesOrder(checked, autoid))
    }

    const userRole = useAppSelector(selectUser)?.role
    const isWorkerOrUser = userRole === 'worker' || userRole === 'client'

    return (
        <div className='mx-auto flex w-40 justify-center'>
            {isWorkerOrUser ? (
                <div
                    className={cn(
                        'flex items-center',
                        isLoading && 'cursor-not-allowed opacity-50 grayscale'
                    )}>
                    <CheckCircle2 className='mr-1.5 h-4 w-4 flex-shrink-0 text-green-700' />
                    Yes
                </div>
            ) : (
                <Toggle
                    disabled={isLoading}
                    pressed={isChecked}
                    onPressedChange={onPressChanage}
                    className={cn(
                        'h-8 w-16 cursor-pointer data-[state=on]:border-green-600 data-[state=on]:bg-green-700/10',
                        isLoading && 'cursor-not-allowed opacity-50 grayscale'
                    )}
                    variant='outline'
                    asChild
                    aria-label='Toggle grouped'>
                    {isChecked ? (
                        <div>
                            <CheckCircle2 className='mr-1.5 h-4 w-4 flex-shrink-0 text-green-700' />
                            Yes
                        </div>
                    ) : (
                        <div>
                            <Circle className='mr-1.5 h-4 w-4 flex-shrink-0 text-foreground' />
                            No
                        </div>
                    )}
                </Toggle>
            )}
        </div>
    )
}
