import { OrderItemType, ItemType } from '../../ts/interfaces'
import List from './List'

interface OrderPropsType {
  order: OrderItemType
  isOperator?: boolean
}

export default ({ order, isOperator = false } : OrderPropsType) => {
  const currentLists = (items: ItemType[]) => items.map(item => (<List item={item} />))

  return (
    <li className="base-card border my-8">
      {!isOperator &&
        <div className="flex justify-end">
          <button className="m-2 px-2 py-0 bg-sky-900">Edit</button>
          <button className="m-2 px-2 py-0 bg-red-900">Delete</button>
        </div>
      }
      <ul className="p-4">
        {currentLists(order.items)}
      </ul>
      <hr />
      <p className="flex justify-end text-xl">total prices:
        <span className="text-red-300 mx-2"
        >$ {order.items.reduce((acc, cur) => acc + (+cur.price), 0)}</span>
      </p>
    </li>
  )
}
