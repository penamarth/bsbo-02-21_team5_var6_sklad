import { EInventoryStatus } from './Enums'

export class Inventory {
  id: string
  private InventoryList: any[] = []
  status: EInventoryStatus = EInventoryStatus.Open

  constructor(id: string) {
    this.id = id
    this.prepareInventoryList()
  }

  prepareInventoryList(): void {
    // Logic to prepare inventory list
  }

  setStatus(status: EInventoryStatus): void {
    this.status = status
  }

  showInventoryList(): any[] {
    return this.InventoryList
  }
}
