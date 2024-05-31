import { Log } from "../services/logger"
import { Shelf } from "./Shelf"
import { StockItem } from "./StockItem"

@Log()
export class Section {
  id: string
  section_id: string
  shelves: Shelf[]

  constructor(id: string, section_id: string, shelves: Shelf[]) {
    this.id = id
    this.section_id = section_id
    this.shelves = shelves
  }

  getEmptyShelf(): Shelf | undefined {
    return this.shelves.find((shelf) => shelf.isEmpty())
  }

  getLocation(item: StockItem): Shelf {
    return this.shelves[0]
  }
}
