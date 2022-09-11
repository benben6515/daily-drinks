import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'

import { OrderItemType, ItemType } from './ts/interfaces'
import './App.css'
import useLocalStorage from './hooks/useLocalStorage'
import data from './utils/data'
import Logos from './components/Logos'
import Orders from './components/Orders'
import Operator from './components/Operator'

function App() {
  const { localOrders } = useLocalStorage()
  const [orders, setOrders] = useState<OrderItemType[]>(data)
  const [currentList, setCurrentList] = useState<OrderItemType>({
    id: nanoid(),
    items: []
  })
  const [currentDrink, setCurrentDrink] = useState<ItemType>({
    id: nanoid(),
    name: '',
    owner: '',
    price: 0,
    notes: [],
  })

  useEffect(() => {
    if (localOrders && localOrders.length > 0) setOrders(localOrders)
  }, [localOrders])

  return (
    <div className="App">
      <Logos />
      <div className="card">
        <h2 className="text-sky-400 text-3xl m-4 font-bold border-b">Daily drinks</h2>
        <Operator
          orders={orders}
          setOrders={setOrders}
          currentList={currentList}
          setCurrentList={setCurrentList}
          currentDrink={currentDrink}
          setCurrentDrink={setCurrentDrink}
        />
        <Orders
          orders={orders}
          setOrders={setOrders}
          setCurrentList={setCurrentList}
          currentList={currentList}
          setCurrentDrink={setCurrentDrink}
          currentDrink={currentDrink}
        />
      </div>
    </div>
  )
}

export default App
