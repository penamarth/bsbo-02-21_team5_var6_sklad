import { Item } from './Item'

export class InvoiceLineItem {
  quantity: number
  item: Item

  constructor(quantity: number, item: Item) {
    this.quantity = quantity
    this.item = item
  }

  getItems(): Item {
    return this.item
  }
}
