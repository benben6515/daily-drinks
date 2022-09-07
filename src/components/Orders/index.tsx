import { OrderItemType, ItemType } from '../../ts/interfaces'
import Order from './Order'

interface OrdersPropsType {
  orders: OrderItemType[]
}

export default ({ orders } : OrdersPropsType) => {
  const currentOrders = orders.map((element) => (<Order order={element} />))

  return (
    <ul>
      {currentOrders}
    </ul>
  )
}
