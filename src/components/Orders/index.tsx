import { OrderItemType, ItemType } from '../../ts/interfaces'
import Order from './Order'

interface OrdersPropsType {
  orders: OrderItemType[]
  setOrders: React.Dispatch<React.SetStateAction<OrderItemType[]>>
  currentList: OrderItemType
  setCurrentList: React.Dispatch<React.SetStateAction<OrderItemType>>
  currentDrink: ItemType
  setCurrentDrink:  React.Dispatch<React.SetStateAction<ItemType>>
}

export default ({ orders, setOrders, currentList, setCurrentList, currentDrink, setCurrentDrink } : OrdersPropsType) => {
  const currentOrders = orders.map((order) => (
    <Order
      key={order.id}
      editingId={currentList.id}
      currentList={order}
      setCurrentList={setCurrentList}
      currentDrink={currentDrink}
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
