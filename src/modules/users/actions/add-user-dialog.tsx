import { Loader2, PlusCircle } from 'lucide-react'
import { useState } from 'react'
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
import { addUserSchema } from '@/config/validation-schemas'
import { useCustomForm } from '@/hooks'
import { useAddUserMutation } from '@/store/api/users/users'
import type { Roles } from '@/store/api/users/users.types'
import { isErrorWithMessage } from '@/utils'

type FormData = zodInfer<typeof addUserSchema>

export const AddUserDialog = () => {
    const [open, setOpen] = useState(false)
    const [addUser, { isLoading }] = useAddUserMutation()

    const form = useCustomForm(addUserSchema, {
        email: '',
        first_name: '',
        last_name: '',
        role: '',
        password: ''
    })

    const currentUserName = `${form.watch('first_name')} ${form.watch('last_name')}`

    const successToast = () =>
        toast.success(`User ${currentUserName}`, {
            description: 'Added successfully'
        })

    const errorToast = (message: string) =>
        toast.error(`User ${currentUserName}`, {
            description: message
        })

    const reset = () => {
        form.reset()
        setOpen(false)
    }

    const handleAddUser = async (data: FormData) => {
        reset()

        try {
            await addUser({
                ...data,
                role: data.role as Roles
            })
                .unwrap()
                .then(successToast)
        } catch (error) {
            const isErrorMessage = isErrorWithMessage(error)
            errorToast(isErrorMessage ? error.data.detail : 'Something went wrong')
        }
    }

    const onSubmit: SubmitHandler<FormData> = (formData) => handleAddUser(formData)

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    onClick={(e) => e.stopPropagation()}
                    variant='ghost'
                    size='sm'>
                    <PlusCircle className='mr-1 h-4 w-4' />
                    Add new user
                </Button>
            </DialogTrigger>
            <DialogContent className='mx-2 rounded-md'>
                <DialogHeader className='text-left'>
                    <DialogTitle>Add new user</DialogTitle>
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
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            placeholder='password123'
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
                            disabled={isLoading}
                            className='w-full'
                            type='submit'>
                            {isLoading ? (
                                <Loader2 className='h-4 w-4 animate-spin' />
                            ) : (
                                'Add new user'
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
