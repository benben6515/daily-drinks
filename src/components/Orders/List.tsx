import Swal from 'sweetalert2'
import { ItemType, OrderItemType } from '../../ts/interfaces'

const spanClass = 'text-sky-600'
const buttonClass="ml-2 px-2 py-0 "

interface ListPropsType {
  item: ItemType
  editingItemId: string
  setCurrentDrink:  React.Dispatch<React.SetStateAction<ItemType>>
  setCurrentList: React.Dispatch<React.SetStateAction<OrderItemType>>
  isOperatorVisible?: boolean
}

export default ({ item, editingItemId ,setCurrentList, setCurrentDrink, isOperatorVisible = false }: ListPropsType) => {
  const handleItemDeleteClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, itemId: string) => {
    e.preventDefault()
    const result = await Swal.fire({
      title: 'Do you want to delete this order?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    })
    if (result.isConfirmed) {
      setCurrentList(prev => {
        return {
          ...prev,
          items: prev.items.filter(e => e.id !== itemId)
        }
      })
    } else if (result.isDenied) {
      Swal.fire('Delete cancel', '', 'info')
    }
  }

  const handleItemEditClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: ItemType) => {
    e.preventDefault()
    setCurrentDrink(item)
  }

  const DeleteOrEditingButton = (id: string) => {
    if (editingItemId === id) {
      return <button className={`${buttonClass} bg-green-600`} onClick={(e) => e.preventDefault()}>Editing</button>
    } else {
      return (
        <button className={`${buttonClass} bg-red-900`} onClick={(e) => handleItemDeleteClick(e, id)}>X</button>
      )
    }
  }

  return (
    <li className=" base-card flex flex-col justify-start items-start">
      {isOperatorVisible &&
        <div className="flex items-end justify-end w-full">
          <button className={`${buttonClass} bg-sky-900`} onClick={(e) => handleItemEditClick(e, item)}>Edit</button>
          {DeleteOrEditingButton(item.id)}
        </div>
      }
      <div className="flex justify-between w-full base-width">
        <div>
          <span className={spanClass}>drink??? </span>
          {item.name}
        </div>
        <div>$ {item.price}</div>
      </div>
      <div>
        <span className={spanClass}>name??? </span>
        {item.owner}
      </div>
      <div className="flex">
        <span className={spanClass}>notes??? </span>
        <ul className="flex flex-col text-slate-400">
          {item.notes.map((note: string) =>
            <li
              key={note}
            >{note}</li>
          )}
        </ul>
      </div>
      <hr className="w-full bg-slate-400 my-2" />
    </li>
  )
}
