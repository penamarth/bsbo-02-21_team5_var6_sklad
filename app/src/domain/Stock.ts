import { Log } from "../services/logger"
import { Assembler } from "./Assembler"
import { Assembling } from "./Assembling"
import {
  EAssemblingStatus,
  EInventoryStatus,
  EInvoiceStatus,
  EMovementOrderStatus,
} from "./Enums"
import { FullInventoryStrategy, Inventory } from "./Inventory"
import { ExpenditureInvoice, Invoice } from "./Invoice"
import { InvoiceLineItem } from "./InvoiceLineItem"
import { Item } from "./Item"
import { MovementOrder } from "./MovementOrder"
import { Section } from "./Section"
import { Shelf } from "./Shelf"
import { StockItem } from "./StockItem"
import { Storekeeper } from "./Storekeeper"
import { Zone } from "./Zone"

@Log()
export class Stock {
  private invoices: Invoice[]
  private assemblings: Assembling[]
  private stockItems: StockItem[]
  private assemblers: Assembler[]
  private zone: Zone
  private inventory: Inventory
  private movementOrders: MovementOrder[]

  constructor() {
    const item = new Item("0", "0", "0", "0")
    const invoiceLineItem = new InvoiceLineItem(1, item)
    const invoice = new ExpenditureInvoice("0", [invoiceLineItem])
    const assembling = new Assembling("0")
    const stockItem = new StockItem("0", 1, item)
    assembling.addTarget(stockItem)
    this.invoices = [invoice]
    this.assemblings = [assembling]
    this.assemblers = [new Storekeeper("0", this)]
    this.stockItems = [stockItem]
    const shelf = new Shelf("0", "0")
    const section = new Section("0", "0", [shelf])
    this.zone = new Zone("0", "0", [section])
    this.inventory = new Inventory("0", new FullInventoryStrategy())
    this.movementOrders = [new MovementOrder(stockItem, shelf)]
  }

  private requestAssembling() {
    this.assemblers.forEach((assembler) => {
      assembler.incomingAssembladge()
    })
  }

  private prepareInventoryList() {}

  private getMovementOrder(id: string): MovementOrder {
    return this.movementOrders[0]
  }

  private updateInventoryList(): void {}

  findItem(id: string): StockItem | undefined {
    return this.stockItems.find((item) => item.id === id)
  }

  findInvoice(id: string): Invoice | undefined {
    return this.invoices.find((invoice) => invoice.id === id)
  }

  findAssembling(id: string): Assembling | undefined {
    return this.assemblings.find((assembling) => assembling.id === id)
  }

  postInvoice(id: string): void {
    const invoice = this.findInvoice(id)
    if (!invoice) {
      return
    }
    const items = invoice.getItems()
    const assembling = this.findAssembling("0")
    if (assembling) {
      const ok = items.every((item) => {
        const stockItem = this.findItem(item.id)
        if (stockItem) {
          return !assembling.hasItem(stockItem)
        } else {
          return true
        }
      })
    }
    invoice.setStatus(EInvoiceStatus.Handling)
    const newAssembling = new Assembling("1")
    items.forEach((item) => {
      const stockItem = this.findItem(item.id)
      if (stockItem) {
        newAssembling.addTarget(stockItem)
      }
    })
    invoice.setStatus(EInvoiceStatus.Closed)
    this.requestAssembling()
  }

  openInvoice(id: string): Invoice {
    const invoice = this.findInvoice(id)!
    invoice.setStatus(EInvoiceStatus.Handling)
    return invoice
  }

  confirmInvoiceItem(article: string, sn: string): void {
    const invoice = this.invoices[0]
    const invoiceItem = invoice.getItem(article, sn)!
    const shelf = this.zone.getEmptyShelf()!
    const stockItem = new StockItem("0", 1, invoiceItem.item)
    shelf.stockItems.push(stockItem)
  }

  completeInvoice(id: string): void {
    const invoice = this.findInvoice(id)
    if (invoice) {
      invoice.setStatus(EInvoiceStatus.Closed)
    }
  }

  startInventory(id: string): [] {
    this.inventory.setStatus(EInventoryStatus.Open)
    this.prepareInventoryList()
    return []
  }

  preformInventory(): void {
    this.inventory.execute()
  }

  scanItem(id: string): void {
    this.stockItems[0].item.getItemData(id)
  }

  enterQuantity(id: string, quantity: number): void {
    this.stockItems[0].updateQuantity(id, quantity)
    this.inventory.setStatus(EInventoryStatus.Closed)
    this.updateInventoryList()
  }

  finishInventory(id: string): void {}

  startAssembling(id: string): void {
    const assembling = this.assemblings[0]
    assembling.setStatus(EAssemblingStatus.Open)
    const items = assembling.getItems()
    items.forEach((item) => {
      this.zone.getLocation(item)
    })
  }

  pickItem(id: string): void {}

  complemeAssembling(): void {
    this.assemblings[0].setStatus(EAssemblingStatus.Closed)
  }

  requestOrder(): [StockItem, Shelf] {
    const order = this.getMovementOrder("0")
    return [order.stockItem, order.shelf]
  }

  startMovementOrder(id: string): void {
    const order = this.movementOrders[0]
    order.setStatus(EMovementOrderStatus.Open)
    order.stockItem.getLocation()
    order.setStatus(EMovementOrderStatus.Closed)
  }
}
