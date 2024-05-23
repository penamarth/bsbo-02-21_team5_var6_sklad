import { Section } from './Section'

export class Zone {
  id: string
  stock_id: string
  sections: Section[] = []

  constructor(id: string, stock_id: string) {
    this.id = id
    this.stock_id = stock_id
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
