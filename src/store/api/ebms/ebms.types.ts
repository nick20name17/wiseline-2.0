import type { CommentsData } from '../comments/comments.types'
import type { Flow, Stage } from '../items/items.types'
import type { PrioritiesData } from '../priorities/priorities.types'
import type { SalesOrdersData } from '../sales-orders/sales-orders.types'
import type { UserComment } from '../users/users.types'

import type { BaseQueryParams, PatchData, Response } from '@/types/api'

export interface CalendarQueryParams {
    year: number
    month: number
}

export type CapacityKey = 'Rollforming' | 'Trim'
export interface DailyDataCategory {
    capacity: number
    count_orders: number
}

interface DailyDataEntry {
    'Standing seam': DailyDataCategory | null
    Rollforming: DailyDataCategory | null
    Trim: DailyDataCategory | null
    Accessories: DailyDataCategory | null
}

export interface EBMSItemData {
    ship_date: string
}
export type EBMSItemPatchData = PatchData<EBMSItemData>

interface DailyData {
    [date: string]: DailyDataEntry
}

interface CapacityData {
    Rollforming: number
    Trim: number
}

export type CalendarResponse = DailyData & {
    capacity_data: CapacityData
}

export interface Capacity {
    capacity: number | null
    total_capacity: number | null
}
export interface CategoriesData extends Capacity {
    id: number
    guid: string
    name: string
    ar_aid: string
    autoid: string
    flow_count: number
    capacity_id: null | number
}

export interface CategoriesResponse extends Response<CategoriesData> {}

export interface CategoriesQueryParams extends BaseQueryParams {
    production_date: string
}

export interface AllCategoriesData extends Capacity {
    id: number
    name: string
}

export interface ColorsData {
    values: string[]
}

export interface CuttingItem {
    color: string
    size: number
    flow_name: string
    autoid: string
    gauge: string
    quantity: number
}

export interface OrdersData {
    id: string
    invoice: string
    customer: string
    sales_order: SalesOrdersData
    origin_items: OriginItems[]
    start_date: string
    end_date: string
    ship_date: string
    c_name: string
    c_city: string
    crea_date: string
    count_items: number
    completed: boolean
}

export interface OrdersResponse extends Response<OrdersData> {}

export interface OrdersItemsData {
    id: number
    invoice: string
    origin_items: OriginItems[]
}

export interface ItemComment {
    id: number
    user: UserComment
    item: string
    text: string
    created_at: string
}
export interface Item {
    id: number
    order: number
    origin_item: string
    flow: Flow
    production_date: string
    time: string
    packages: number
    location: number
    priority: PrioritiesData
    comments: ItemComment[]
    stage: Stage | null
}
export interface OriginItem {
    id: string
    category: string
    description: string
    quantity: string
    shipped: string
    ship_date: string
    width: string
    weight: string
    length: string
    bends: string
    customer: string
    order: string
    id_inven: string
    origin_order: string
    completed: boolean
    profile: string
    color: string
    gauge: string
    item: Item
    production_date: string
    priority: number
    comments: CommentsData[]
}
export interface OriginItems {
    id: string
    category: string
    description: string
    quantity: string
    shipped: string
    ship_date: string
    width: string
    weight: string
    length: string
    bends: string
    customer: string
    order: string
    id_inven: string
    origin_order: string
    completed: boolean
    profile: string
    color: string
    gauge: string
    item: Item
    production_date: string
    priority: number
    comments: CommentsData[]
    cutting_items: OriginItem[]
}

export interface OrdersItemsResponse extends Response<OrdersItemsData> {}

export interface EBMSItemsData {
    id: string
    category: string
    description: string
    quantity: string
    ship_date?: string
    width: string
    completed: boolean
    profile: string
    weight: string
    length: string
    color: string
    gauge: string
    item: Item | null
    origin_order: string
    bends: string
    customer: string
    order: string
    id_inven: string
    shipped: string
}

export interface EBMSItemsResponse extends Response<EBMSItemsData> {}

export interface OrdersQueryParams extends BaseQueryParams {
    invoice: number
    name: string
    date: string
    category: string
    is_scheduled: boolean | null
    created_at: string
    categories: string
    over_due: boolean
    completed: boolean | null
    search: string | null
    ordering: string
    release_to_production: boolean
    stage_id: number | null
    flow_id: number | null
    category__prod_type: string
    flow: string
    flow_ids: string
    has_comments: boolean | null
    status_not_in: string
    timedelta: number
    date_range: string
    flow_id__isnull: boolean
    stage_id__isnull: boolean
    status: string
    priority: number
    cutting_complete: boolean
    assigned: boolean
    production_date__isnull: boolean
    quantity: number
    width: number
    length: number
    weight: number
    bends: number
    autoid__not_in: string
    autoid__in: string
    order: string
    order_by: string
}

export interface CuttingItemQueryParams extends BaseQueryParams {
    color: string | null
}
export interface OrderQueryParams extends BaseQueryParams {
    id: number
    category: string
    autoid: string
}
export interface OrderItemsQueryParams extends BaseQueryParams {
    id: number
    category: string
}
export interface EBMSItemsQueryParams extends BaseQueryParams {
    quan: number
    weight: number
    date_range: string
    search: string
    ordering: string
    width: string
    widthd: number
    over_due: boolean
    height: string
    completed: boolean
    heightd: number
    ship_date: string
    order: string
    is_scheduled: boolean | null
    category: string | null
    production_date: string
    has_comment: boolean
    flow: string
    flow_id: string | null
    flow_ids: string
    stage_id: string | null
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

export type CuttingItemResponse = Response<CuttingItem>
