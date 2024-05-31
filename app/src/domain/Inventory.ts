import { Log } from "../services/logger"
import { EInventoryStatus } from "./Enums"

@Log()
export class Inventory {
  id: string
  private InventoryList: any[] = []
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

  execute(): void {
    this.strategy.prepareInventoryList()
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
