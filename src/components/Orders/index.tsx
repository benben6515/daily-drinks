import { OrderItemType, ItemType } from '../../ts/interfaces'
import Order from './Order'

interface OrdersPropsType {
  orders: OrderItemType[]
  setOrders: React.Dispatch<React.SetStateAction<OrderItemType[]>>
  setCurrentList: React.Dispatch<React.SetStateAction<OrderItemType>>
  setCurrentDrink:  React.Dispatch<React.SetStateAction<ItemType>>
}

export default ({ orders, setOrders, setCurrentList, setCurrentDrink } : OrdersPropsType) => {
  const currentOrders = orders.map((order) => (
    <Order
      key={order.id}
      currentList={order}
      setCurrentList={setCurrentList}
      setCurrentDrink={setCurrentDrink}
      setOrders={setOrders}
    />
  ))

  return (
    <ul>
      {currentOrders}
    </ul>
  )
}
