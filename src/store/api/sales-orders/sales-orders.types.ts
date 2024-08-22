import type { PrioritiesData } from '../priorities/priorities.types'

import type { PatchData, Response } from '@/types/api'

export interface SalesOrdersData {
    id: number
    order: string
    priority: PrioritiesData
    packages: number
    location: number
    production_date: string | null
    assigned: boolean
    release_to_production: boolean
    cutting_complete: boolean
}

export type SalesOrdersAddData = Omit<SalesOrdersData, 'id' | 'priority'> & {
    priority: number | null
}

export type SalesOrdersPatchData = PatchData<SalesOrdersAddData>

export type SalesOrdersResponse = Response<SalesOrdersData>
