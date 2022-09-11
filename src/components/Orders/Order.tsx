import Swal from 'sweetalert2'
import { OrderItemType, ItemType } from '../../ts/interfaces'
import List from './List'

const buttonClass="m-2 px-2 py-0 "

interface OrderPropsType {
  setOrders: React.Dispatch<React.SetStateAction<OrderItemType[]>>
  currentList: OrderItemType
  setCurrentList: React.Dispatch<React.SetStateAction<OrderItemType>>
  setCurrentDrink:  React.Dispatch<React.SetStateAction<ItemType>>
  isOperatorVisible?: boolean
}

export default ({ setOrders, currentList, setCurrentList, setCurrentDrink, isOperatorVisible = false } : OrderPropsType) => {
  const currentLists = (items: ItemType[]) => items.map(item => (
    <List
      key={item.id}
      item={item}
      setCurrentDrink={setCurrentDrink}
      setCurrentList={setCurrentList}
      isOperatorVisible={isOperatorVisible}
    />
  ))

  const handleOrdersDeleteClick = async (orderId: string) => {
    const result = await Swal.fire({
      title: 'Do you want to delete this order?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    })
    console.log(result)
    if (result.isConfirmed) {
      setOrders((oldOrders) => {
        return oldOrders.filter(e => e.id !== orderId)
      })
    } else if (result.isDenied) {
      Swal.fire('Delete cancel', '', 'info')
    }
  }

  const handleOrdersEditClick = (order: OrderItemType) => setCurrentList(order)

  return (
    <li className="base-card border my-8">
      {!isOperatorVisible &&
        <div className="flex justify-end">
          <button className={`${buttonClass} bg-sky-900`} onClick={() => handleOrdersEditClick(currentList)}>Edit</button>
          <button className={`${buttonClass} bg-red-900`} onClick={() => handleOrdersDeleteClick(currentList.id)}>Delete</button>
        </div>
      }
      <ul className="p-4">
        {currentLists(currentList.items)}
      </ul>
      <hr />
      <p className="flex justify-end text-xl">total prices:
        <span className="text-red-300 mx-2"
        >$ {currentList.items.reduce((acc, cur) => acc + (+cur.price), 0)}</span>
      </p>
    </li>
  )
}
