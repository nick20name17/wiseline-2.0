import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import type { infer as zodInfer } from 'zod'

import { ForgetPassword } from '../forget-password'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginSchema } from '@/config/validation-schemas'
import { useCustomForm } from '@/hooks'
import { useLoginMutation } from '@/store/api'
import { isErrorWithMessage } from '@/utils'

type FormData = zodInfer<typeof loginSchema>

export const Login = () => {
    const [rememberMe, setRememberMe] = useState(true)

    const navigate = useNavigate()
    const [error, setError] = useState('')

    const form = useCustomForm(loginSchema, { email: '', password: '' })

    const [login, { isLoading }] = useLoginMutation()

    const handleLogin = async (data: FormData) => {
        try {
            await login(data).unwrap()
            if (!rememberMe) {
                sessionStorage.setItem('rememberMe', JSON.stringify({ rememberMe: true }))
            }
            navigate('/')
        } catch (error) {
            const isErrorMessage = isErrorWithMessage(error)
            setError(isErrorMessage ? error.data.detail : 'An error occurred')
        }
    }

    const onRememberMe = () => setRememberMe(!rememberMe)

    if (rememberMe) {
        localStorage.setItem('rememberMe', JSON.stringify({ rememberMe: true }))
    } else {
        localStorage.removeItem('rememberMe')
    }

    const onSubmit: SubmitHandler<FormData> = (formData) => handleLogin(formData)

    return (
        <div className='flex h-screen items-center justify-center'>
            <div className='mx-auto w-[300px]'>
                <Form {...form}>
                    <form
                        className='space-y-5'
                        onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            disabled={isLoading}
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
                            disabled={isLoading}
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='.......'
                                            type='password'
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            className='w-full'
                            disabled={isLoading}
                            type='submit'>
                            {isLoading ? (
                                <Loader2 className='h-4 w-4 animate-spin' />
                            ) : (
                                'Log In'
                            )}
                        </Button>
                    </form>
                </Form>
                {error ? (
                    <div className='mt-4 text-sm font-medium text-destructive'>
                        {error}
                    </div>
                ) : null}
                <div className='mt-5 flex items-center justify-between'>
                    {/* <ForgetPassword disabled={isLoading} /> */}
                    <div className='flex items-center space-x-2'>
                        <Checkbox
                            checked={rememberMe}
                            disabled={isLoading}
                            id='terms'
                            aria-label='Remember me'
                            onClick={onRememberMe}
                        />
                        <label
                            htmlFor='terms'
                            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                            Remember me
                        </label>
                    </div>
                    <ForgetPassword />
                </div>
            </div>
        </div>
    )
}
