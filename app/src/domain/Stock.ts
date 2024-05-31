import { Log } from "../services/logger"
import { Assembler } from "./Assembler"
import { Assembling } from "./Assembling"
import { EInventoryStatus, EInvoiceStatus } from "./Enums"
import { FullInventoryStrategy, Inventory } from "./Inventory"
import { ExpenditureInvoice, Invoice } from "./Invoice"
import { InvoiceLineItem } from "./InvoiceLineItem"
import { Item } from "./Item"
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
  }

  private requestAssembling() {
    this.assemblers.forEach((assembler) => {
      assembler.incomingAssembladge()
    })
  }

  private prepareInventoryList() {}

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

  startInventory(id: string): void {
    this.inventory.setStatus(EInventoryStatus.Open)
    this.prepareInventoryList()
  }

  scanItem(id: string): void {}

  finishInventory(id: string): void {
    // Logic to finish inventory
  }
}
