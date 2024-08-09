export const tableConfig = {
    pagination: {
        pageSize: 20,
        pageIndex: 0
    },
    pageSizeOptions: [20, 40, 60, 80, 100]
}

export const trimOnlyColumns = [
    'gauge',
    'assigned',
    'release_to_production',
    'cutting_complete'
]

export const alwaysVisibleColumns = ['flow', 'status', 'production_date']
