import type { Capacity } from '../ebms.types'

import type { BaseQueryParams, Response } from '@/types/api'

export interface CategoryData extends Capacity {
    id: string
    guid: string
    name: string
    ar_aid: string
    autoid: string
    flow_count: number
    capacity_id: null | number
}

export type CategoriesResponse = Response<CategoryData>

export interface CategoriesQueryParams extends BaseQueryParams {
    production_date: string
}

export interface AllCategoriesData extends Capacity {
    id: string
    name: string
}
