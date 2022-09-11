import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import Swal from "sweetalert2"
import { ItemType, OrderItemType } from "../../ts/interfaces"
import Order from "../Orders/Order"
import useLocalStorage from "../../hooks/useLocalStorage"

// util style
const inputClass = "m-2 pl-2"
const labelClass = "base-label-width flex justify-between items-center"
const buttonClass = "m-2"

interface OperatorPropsType {
  orders: OrderItemType[]
  setOrders: React.Dispatch<React.SetStateAction<OrderItemType[]>>
  currentList: OrderItemType
  setCurrentList: React.Dispatch<React.SetStateAction<OrderItemType>>
  currentDrink: ItemType
  setCurrentDrink: React.Dispatch<React.SetStateAction<ItemType>>
}

export default ({
  orders,
  setOrders,
  currentList,
  setCurrentList,
  currentDrink,
  setCurrentDrink,
}: OperatorPropsType) => {
  const { saveLocalOrders } = useLocalStorage()
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [currentNote, setCurrentNote] = useState("")
  const [isListEditing, setIsListEditing] = useState(false)
  const [isDrinkEditing, setIsDrinkEditing] = useState(false)

  useEffect(() => {
    if (orders.some((e) => e.id === currentList.id)) {
      setIsListEditing(true)
      setIsFormVisible(true)
    }
  }, [orders, currentList])

  useEffect(() => {
    if (currentList.items.some((e) => e.id === currentDrink.id)) {
      setIsDrinkEditing(true)
      setIsFormVisible(true)
    }
  }, [currentList, currentDrink])

  const toggleForm = () => {
    setIsFormVisible(() => !isFormVisible)
  }

  const clearCurrentData = () => {
    setCurrentDrink({
      id: nanoid(),
      name: "",
      owner: "",
      price: 0,
      notes: [],
    })
    setCurrentList({
      id: nanoid(),
      items: [],
    })
    setCurrentNote("")
  }

  const handleDrinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCurrentDrink((prev) => ({
      ...prev,
      [name]: name === "price" ? +value : value,
    }))
  }

  const handleAddNote = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    if (!currentNote) {
      Swal.fire({
        title: "Warning",
        text: "note can not be empty string!",
      })
      return
    }
    if (currentDrink.notes.includes(currentNote)) {
      Swal.fire({
        title: "Warning",
        text: "same note was already in!",
      })
      setCurrentNote("")
      return
    }
    setCurrentDrink((oldDrink) => ({
      ...oldDrink,
      notes: [...oldDrink.notes, currentNote],
    }))
    setCurrentNote("")
  }

  const handleDeleteNote = (note: string) => {
    setCurrentDrink((oldDrink) => ({
      ...oldDrink,
      notes: oldDrink.notes.filter((e) => e !== note),
    }))
  }

  const validCurrentDrink = () => {
    let isValid = true
    ;["name", "owner", "price"].forEach((e) => {
      if (!currentDrink[e as keyof ItemType]) {
        isValid = false
        Swal.fire({
          title: "Warning",
          text: `drink ${e} can not be ${e === "price" ? "0" : "empty"}!`,
        })
      }
    })
    return isValid
  }

  const handleAddOrEditDrink = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    if (!validCurrentDrink()) return
    if (isDrinkEditing) {
      setCurrentList((prev) => {
        const newItems = prev.items.map((e) => {
          if (e.id === currentDrink.id) {
            return { ...currentDrink }
          }
          return e
        })
        return {
          ...prev,
          items: newItems,
        }
      })
      setIsDrinkEditing(false)
    } else {
      setCurrentList((prev) => {
        const newItems = [...prev.items, currentDrink]
        return {
          ...prev,
          items: newItems,
        }
      })
    }
    setCurrentDrink({
      id: nanoid(),
      name: "",
      owner: "",
      price: 0,
      notes: [],
    })
    setCurrentNote("")
  }

  const handleAddOrEditOrder = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    if (isListEditing) {
      setOrders((prev) =>
        prev.map((e) => {
          if (e.id === currentList.id) {
            return { ...currentList }
          }
          return e
        })
      )
      setIsListEditing(false)
    } else {
      setOrders((prev) => [currentList, ...prev])
    }
    clearCurrentData()
  }

  const handleSave = () => {
    saveLocalOrders(orders)
    Swal.fire({
      icon: "success",
      title: "All orders have been saved",
      showConfirmButton: true,
      timer: 1500,
    })
  }

  const currentForm = () => {
    if (!isFormVisible) {
      return <div></div>
    }
    return (
      <form className='base-width flex flex-col'>
        <label className={labelClass}>
          <span>Owner：</span>
          <input
            className={inputClass}
            type='text'
            name='owner'
            value={currentDrink.owner}
            onChange={handleDrinkChange}
          />
        </label>
        <label className={labelClass}>
          <span>Drink：</span>
          <input
            className={inputClass}
            type='text'
            name='name'
            value={currentDrink.name}
            onChange={handleDrinkChange}
          />
        </label>
        <label className={labelClass}>
          <span>Price：</span>
          <input
            className={inputClass}
            type='number'
            name='price'
            value={currentDrink.price}
            onChange={handleDrinkChange}
          />
        </label>

        <label className={labelClass.replace("items-center", "items-start")}>
          <span>Note：</span>
          <ul className='flex flex-col'>
            {currentDrink.notes.map((note) => (
              <li key={note}>
                <span>{note}</span>
                <span
                  className='inline-flex m-2 px-2 text-red-400 bg-red-200 rounded-full cursor-pointer'
                  onClick={() => handleDeleteNote(note)}
                >
                  X
                </span>
              </li>
            ))}
          </ul>
        </label>
        <label className={labelClass}>
          <input
            className={inputClass}
            type='text'
            name='note'
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
          />
          <button className={buttonClass} onClick={(e) => handleAddNote(e)}>
            Add Note
          </button>
        </label>

        <button
          className={buttonClass}
          onClick={(e) => handleAddOrEditDrink(e)}
        >
          {isDrinkEditing ? "Finish Editing" : "Add"} Drink
        </button>

        <ul>
          <Order
            editingId={currentList.id}
            setOrders={setOrders}
            currentList={currentList}
            setCurrentList={setCurrentList}
            currentDrink={currentDrink}
            setCurrentDrink={setCurrentDrink}
            isOperatorVisible={true}
          />
        </ul>

        <button
          className={`${buttonClass} disabled:opacity-60 disabled:cursor-not-allowed`}
          disabled={!currentList.items.length}
          onClick={(e) => handleAddOrEditOrder(e)}
        >
          {isListEditing ? "Finish Editing" : "Add"} Order
        </button>

        <hr className='w-full h-1 bg-sky-500 my-8 border-none' />
      </form>
    )
  }

  return (
    <section className='flex flex-col items-start'>
      <div className='flex justify-between w-full'>
        <button onClick={toggleForm}>{isFormVisible ? "-" : "+"}</button>
        <button
          className='bg-green-700 hover:bg-green-600'
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      {currentForm()}
    </section>
  )
}
