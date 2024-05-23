import { StockItem } from './StockItem'
import { Shelf } from './Shelf'

export class MovementOrder {
  stockItem: StockItem
  shelf: Shelf

  constructor(stockItem: StockItem, shelf: Shelf) {
    this.stockItem = stockItem
    this.shelf = shelf
  }
}
