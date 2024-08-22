import { Edit2Icon, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { type SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import type { infer as zodInfer } from 'zod'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { editUserSchema } from '@/config/validation-schemas'
import { useCustomForm } from '@/hooks'
import { usePatchUserMutation } from '@/store/api/users/users'
import type { Roles, User } from '@/store/api/users/users.types'
import { useAppSelector } from '@/store/hooks/hooks'
import { selectUser } from '@/store/slices/auth'
import { isErrorWithMessage } from '@/utils'

type FormData = zodInfer<typeof editUserSchema>

interface EditUserDialogProps {
    user: User
}

export const EditUserDialog: React.FC<EditUserDialogProps> = ({ user }) => {
    const userName = `${user.first_name} ${user.last_name}`
    const isSelf = user.id === useAppSelector(selectUser)?.id

    const form = useCustomForm(editUserSchema, {
        ...user,
        password: ''
    })

    const [patchUser, { isLoading }] = usePatchUserMutation()

    const [open, setOpen] = useState(false)

    const successToast = () =>
        toast.success(`User ${userName}`, {
            description: 'Edited successfully'
        })

    const errorToast = (message: string) =>
        toast.error(`User ${userName}`, {
            description: message
        })

    const handlePatchUser = async (data: FormData) => {
        setOpen(false)

        try {
            await patchUser({
                id: user.id,
                data: {
                    ...data,
                    role: data.role as Roles
                }
            })
                .unwrap()
                .then(successToast)
        } catch (error) {
            const isErrorMessage = isErrorWithMessage(error)
            errorToast(isErrorMessage ? error.data.detail : 'Something went wrong')
        }
    }

    const onSubmit: SubmitHandler<FormData> = (formData) => handlePatchUser(formData)

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    onClick={(e) => e.stopPropagation()}
                    className='justify-start'
                    variant='ghost'
                    size='sm'>
                    <Edit2Icon className='mr-2 h-3.5 w-3.5' />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className='mx-2 rounded-md'>
                <DialogHeader className='text-left'>
                    <DialogTitle>Edit {userName} ?</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className='space-y-5'
                        onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='nickname@gmail.com'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='first_name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='John'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='last_name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Doe'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='role'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select
                                        disabled={isSelf}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}>
                                        <SelectTrigger className='w-full min-w-[160px] text-left'>
                                            <SelectValue placeholder='Select role' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='admin'>Admin</SelectItem>
                                            <SelectItem value='worker'>Worker</SelectItem>
                                            <SelectItem value='manager'>
                                                Manager
                                            </SelectItem>
                                            <SelectItem value='client'>
                                                View only
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            className='w-full'
                            type='submit'
                            disabled={isLoading}>
                            {isLoading ? (
                                <Loader2 className='h-4 w-4 animate-spin' />
                            ) : false ? (
                                "You can't edit admin"
                            ) : (
                                'Edit user'
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
