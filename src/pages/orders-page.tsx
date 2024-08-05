import { OrdersHeader } from '@/components/layout/header/orders-header'
import { Orders } from '@/modules'

export const OrdersPage = () => {
    return (
        <>
            <OrdersHeader />
            <Orders />
        </>
    )
}
