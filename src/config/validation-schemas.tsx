import { object, string } from 'zod'

const passwordSchema = {
    password: string()
        .min(1, 'Password is required')
        .min(8, 'Password must contain at least 8 characters')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Password must contain at least one digit')
        .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
}

export const loginSchema = object({
    email: string().min(1, 'Email is required').email(),
    ...passwordSchema
})

export const commentSchema = object({
    text: string()
})

export const stageSchema = object({
    name: string().min(1, 'Stage name is required'),
    description: string().optional()
})

export const flowSchema = object({
    name: string().min(1, 'Flow name is required')
})

export const capacitySchema = object({
    per_day: string().min(1, 'Per day is required')
})

const newPasswordSchema = object({
    new_password1: passwordSchema.password,
    new_password2: string().min(1, 'New password confirmation is required')
})

export const changePasswordSchema = object({
    old_password: passwordSchema.password,
    ...newPasswordSchema.shape
}).refine((data) => data.new_password1 === data.new_password2, {
    message: "Passwords don't match",
    path: ['new_password2']
})

export const passwordResetConfirmSchema = object({
    ...newPasswordSchema.shape
}).refine((data) => data.new_password1 === data.new_password2, {
    message: "Passwords don't match",
    path: ['new_password2']
})

export const userPatchSchema = object({
    first_name: string().min(1, 'First name is required'),
    last_name: string().min(1, 'Last name is required'),
    email: string().min(1, 'Email is required').email()
})

export const emailSchema = object({
    email: string().min(1, 'Email is required').email()
})

export const addUserSchema = object({
    ...userPatchSchema.shape,
    password: passwordSchema.password,
    role: string({
        required_error: 'Please select an role'
    }).min(1, 'Role is required')
})

export const editUserSchema = object({
    ...userPatchSchema.shape,
    password: passwordSchema.password,
    role: string({
        required_error: 'Please select an role'
    }).min(1, 'Role is required')
})

export const prioritySchema = object({
    name: string().min(1, 'Priority name is required'),
    position: string().min(1, 'Priority number is required')
})
