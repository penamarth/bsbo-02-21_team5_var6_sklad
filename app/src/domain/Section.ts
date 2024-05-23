import { Shelf } from './Shelf'

export class Section {
  id: string
  section_id: string
  shelves: Shelf[] = []

  constructor(id: string, section_id: string) {
    this.id = id
    this.section_id = section_id
  }

  getEmptyShelf(): Shelf | undefined {
    return this.shelves.find(shelf => shelf.isEmpty())
  }
}
