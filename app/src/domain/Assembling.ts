import { Log } from "../services/logger"
import { EAssemblingStatus } from "./Enums"
import { StockItem } from "./StockItem"

@Log()
export class Assembling {
  id: string
  status: EAssemblingStatus
  private items: StockItem[] = []

  constructor(id: string) {
    this.id = id
    this.status = EAssemblingStatus.Open
  }

  hasItem(stockItem: StockItem): boolean {
    return this.items.includes(stockItem)
  }

  addTarget(stockItem: StockItem): void {
    if (!this.hasItem(stockItem)) {
      this.items.push(stockItem)
    }
  }

  setStatus(status: EAssemblingStatus) {
    this.status = status
  }

  getItems(): StockItem[] {
    return this.items
  }
}
