import { Log } from "../services/logger"
import { StockItem } from "./StockItem"

@Log()
export class Assembling {
  id: string
  private items: StockItem[] = []

  constructor(id: string) {
    this.id = id
  }

  hasItem(stockItem: StockItem): boolean {
    return this.items.includes(stockItem)
  }

  addTarget(stockItem: StockItem): void {
    if (!this.hasItem(stockItem)) {
      this.items.push(stockItem)
    }
  }
}
