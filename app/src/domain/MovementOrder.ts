import { StockItem } from './StockItem'
import { Shelf } from './Shelf'
import { Log } from "../services/logger"
import { EMovementOrderStatus } from "./Enums"

@Log()
export class MovementOrder {
  stockItem: StockItem
  shelf: Shelf
  status: EMovementOrderStatus

  constructor(stockItem: StockItem, shelf: Shelf) {
    this.stockItem = stockItem
    this.shelf = shelf
    this.status = EMovementOrderStatus.Open
  }

  setStatus(status: EMovementOrderStatus): void {
    this.status = status
  }
}
