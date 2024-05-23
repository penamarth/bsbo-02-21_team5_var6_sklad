import { StockItem } from './StockItem'

export class Shelf {
  id: string
  shelf_id: string
  stockItems: StockItem[] = []

  constructor(id: string, shelf_id: string) {
    this.id = id
    this.shelf_id = shelf_id
  }

  isEmpty(): boolean {
    return this.stockItems.length === 0
  }
}
