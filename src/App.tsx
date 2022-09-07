import { useState } from 'react'
import './App.css'
import data from './utils/data'
import Logos from './components/Logos'
import Orders from './components/Orders'
import Operator from './components/Operator'

function App() {
  const [orders, setOrders] = useState(data)

  return (
    <div className="App">
      <Logos />
      <div className="card">
        <h2 className="text-sky-400 text-3xl m-4 font-bold border-b">Daily drinks</h2>
        <Operator setOrders={setOrders} />
        <Orders orders={orders} />
      </div>
    </div>
  )
}

export default App
