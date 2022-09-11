import { useState } from 'react'
import { nanoid } from 'nanoid'

import { OrderItemType } from './ts/interfaces'
import './App.css'
import data from './utils/data'
import Logos from './components/Logos'
import Orders from './components/Orders'
import Operator from './components/Operator'

function App() {
  const [orders, setOrders] = useState(data)
  const [currentList, setCurrentList] = useState<OrderItemType>({
    id: nanoid(),
    items: []
  })

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
        />
        <Orders
          orders={orders}
          setOrders={setOrders}
          setCurrentList={setCurrentList}
        />
      </div>
    </div>
  )
}

export default App
