import { Item } from './Item'

export class StockItem {
  id: string
  quantity: number
  item: Item

  constructor(id: string, quantity: number, item: Item) {
    this.id = id
    this.quantity = quantity
    this.item = item
  }

  updateQuantity(id: string, quantity: number): void {
    if (this.id === id) {
      this.quantity = quantity
    }
  }
}
