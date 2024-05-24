import { Log } from "../services/logger"

@Log()
export class Item {
  id: string
  article: string
  serial_no: string
  private name: string

  constructor(id: string, name: string, article: string, serial_no: string) {
    this.id = id
    this.name = name
    this.article = article
    this.serial_no = serial_no
  }

  getItemData(id: string): string {
    // Logic to get item data
    return this.name
  }
}
