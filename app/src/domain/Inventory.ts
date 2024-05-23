import { InventoryStatus } from './Enums'

export class Inventory {
  id: string
  private InventoryList: any[] = []
  status: InventoryStatus = InventoryStatus.Open

  constructor(id: string) {
    this.id = id
    this.prepareInventoryList()
  }

  prepareInventoryList(): void {
    // Logic to prepare inventory list
  }

  setStatus(status: InventoryStatus): void {
    this.status = status
  }

  showInventoryList(): any[] {
    return this.InventoryList
  }

  updateInventoryList(): void {
    // Logic to update inventory list
  }
}
