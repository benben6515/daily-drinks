import { useState, useEffect } from "react";
import { OrderItemType } from "../ts/interfaces";

const ordersKey = 'orders-key'

export default () => {
  const [localOrders, setLocalOrders] = useState<OrderItemType[]>([])
  const jsonString = window.localStorage.getItem(ordersKey) || ''
  useEffect(() => {
    if (jsonString) {
      setLocalOrders(JSON.parse(jsonString))
    }
  }, [])

  const saveLocalOrders = (orders: OrderItemType[]) => {
    window.localStorage.setItem(ordersKey, JSON.stringify(orders))
    setLocalOrders(orders)
  }
  return { localOrders, saveLocalOrders }
}
