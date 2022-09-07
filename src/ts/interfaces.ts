// naming is a big problem
// I consider it is a simply project

// item meaning list in orders list
export interface ItemType {
  name: string
  owner: string
  price: number
  notes: string[]
}

export interface OrderItemType {
  id: string
  items: ItemType[]
}
