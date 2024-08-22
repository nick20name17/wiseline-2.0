import type { BaseQueryParams, PatchData, Response } from '@/types/api'

export interface StageData {
    id: number
    name: string
    description?: string
    position: number
    default?: boolean
    color: string
    flow?: number
}

export interface StageWithItemIds extends StageData {
    item_ids: number[]
}

export interface StagesQueryParams extends BaseQueryParams {
    position: number
    flow: number | null
    search: string
    ordering: string
}

export type StageAddData = Omit<StageData, 'id' | 'position'> & {
    position?: number
}

export type StagePatchData = PatchData<StageAddData>

export type StagesResponse = Response<StageData>
