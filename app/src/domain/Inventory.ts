import { Log } from "../services/logger"
import { EInventoryStatus } from "./Enums"
import { StockItem } from "./StockItem"

@Log()
export class Inventory {
  id: string
  private InventoryList: StockItem[] = []
  status: EInventoryStatus = EInventoryStatus.Open
  strategy: InventoryStrategy

  constructor(id: string, strategy: InventoryStrategy) {
    this.id = id
    this.strategy = strategy
  }

  setStatus(status: EInventoryStatus): void {
    this.status = status
  }

  showInventoryList(): any[] {
    return this.InventoryList
  }

  executeStrategy(): StockItem[] {
    this.strategy.prepareInventoryList()
    return []
  }

  setStrategy(strategy: InventoryStrategy): void {
    this.strategy = strategy
  }
}

export interface InventoryStrategy {
  prepareInventoryList(): void
}

@Log()
export class PartialInventoryStrategy implements InventoryStrategy {
  prepareInventoryList(): void {}
}

@Log()
export class FullInventoryStrategy implements InventoryStrategy {
  prepareInventoryList(): void {}
}
