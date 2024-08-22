import type { User } from '../users/users.types'

import type { PatchData, Response } from '@/types/api'

interface CommentUser extends Omit<User, 'role' | 'category'> {}
export interface CommentsData {
    id: number
    user: CommentUser
    item: string
    text: string
    created_at: string
}

export interface CommentsAddData {
    user: number
    item: string
    text: string
    order: string
}

export type CommentsPatchData = PatchData<CommentsAddData>

export type CommentsResponse = Response<CommentsData>
