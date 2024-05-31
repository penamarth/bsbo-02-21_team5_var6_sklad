import { Log } from "../services/logger"
import { Section } from "./Section"
import { Shelf } from "./Shelf"

@Log()
export class Zone {
  id: string
  stock_id: string
  sections: Section[]

  constructor(id: string, stock_id: string, sections: Section[]) {
    this.id = id
    this.stock_id = stock_id
    this.sections = sections
  }

  getEmptyShelf(): Shelf | undefined {
    for (const section of this.sections) {
      const shelf = section.getEmptyShelf()
      if (shelf) {
        return shelf
      }
    }
    return undefined
  }
}
