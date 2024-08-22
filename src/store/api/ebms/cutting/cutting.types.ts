import type { BaseQueryParams, Response } from '@/types/api'

export interface ColorsData {
    values: string[]
}

export interface CuttingItem {
    color: string
    size: number
    length: number
    flow_name: string
    cutting_complete: boolean
    autoid: string
    gauge: string
    quantity: number
}

export interface CuttingItemQueryParams extends BaseQueryParams {
    color: string | null
}

export type CuttingItemResponse = Response<CuttingItem>
