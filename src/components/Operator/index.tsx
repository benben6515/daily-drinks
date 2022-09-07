import { useState } from 'react'
import { nanoid } from 'nanoid'
import { ItemType, OrderItemType } from '../../ts/interfaces'
import Order from '../Orders/Order'

// util style
const inputClass = 'm-2 pl-2'
const labelClass = 'base-label-width flex justify-between items-center'

interface OperatorPropsType {
  setOrders: React.Dispatch<React.SetStateAction<OrderItemType[]>>
}

export default ({ setOrders } : OperatorPropsType) => {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [list, setList] = useState<OrderItemType>({
    id: '',
    items: []
  })
  const [currentDrink, setCurrentDrink] = useState<ItemType>({
    name: '',
    owner: '',
    price: 0,
    notes: [],
  })
  const [currentNote, setCurrentNote] = useState('')

  const toggleForm = () => {
    setIsFormVisible(() => !isFormVisible)
  }

  const handleDrinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('change', currentDrink)
    const { name, value } = e.target;
    setCurrentDrink(prev => ({
        ...prev,
        [name]: value
    }));
};

  const handleAddDrink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setList((prev) => {
      const newItems = [...prev.items, currentDrink]
      return {
        id: nanoid(),
        items: newItems
      }
    })
  }

  const handleAddOrder = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setOrders((prev) => [list, ...prev])
  }

  const currentForm = () => {
    if (!isFormVisible) {
      return <div></div>
    }
    return (
      <form className="base-width flex flex-col">
        <ul>
          <Order order={list} isOperator={true}/>
        </ul>
        <label className={labelClass}>
          <span>Owner：</span>
          <input
            className={inputClass}
            type="text"
            name="owner"
            value={currentDrink.owner}
            onChange={handleDrinkChange}
          />
        </label>
        <label className={labelClass}>
          <span>Drink：</span>
          <input
            className={inputClass}
            type="text"
            name="name"
            value={currentDrink.name}
            onChange={handleDrinkChange}
          />
        </label>
        <label className={labelClass}>
          <span>Price：</span>
          <input
            className={inputClass}
            type="number"
            name="price"
            value={currentDrink.price}
            onChange={handleDrinkChange}
          />
        </label>

        {/* TODO */}
        <label className={labelClass}>
          <span>Note：</span>
          <input
            className={inputClass}
            type="number"
            name="note"
            value={currentDrink.price}
            onChange={handleDrinkChange}
          />
        </label>

        <button onClick={(e) => handleAddDrink(e)}>Add Drink</button>
        <button onClick={(e) => handleAddOrder(e)}>Add Order</button>
      </form>
    )
  }

  return (
    <section className="flex flex-col items-start">
      <button onClick={toggleForm}>
        { isFormVisible ? '-' : '+'}
      </button>
      {currentForm()}
      <hr />
    </section>
  )
}