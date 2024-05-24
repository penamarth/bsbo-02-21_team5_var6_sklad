import { Log } from "../services/logger"
import { Assembling } from "./Assembling"
import { EInvoiceStatus } from "./Enums"
import { ExpenditureInvoice, Invoice } from "./Invoice"
import { InvoiceLineItem } from "./InvoiceLineItem"
import { Item } from "./Item"
import { StockItem } from "./StockItem"

@Log()
export class Stock {
  private invoices: Invoice[]
  private assemblings: Assembling[]
  private stockItems: StockItem[]
  constructor() {
    const item = new Item("0", "Item", "1234567890", "0987654321")
    const invoiceLineItem = new InvoiceLineItem(1, item)
    const invoice = new ExpenditureInvoice("0", [invoiceLineItem])
    const assembling = new Assembling("0")
    const stockItem = new StockItem("0", 1, item)
    assembling.addTarget(stockItem)
    this.invoices = [invoice]
    this.assemblings = [assembling]
    this.stockItems = [stockItem]
  }

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
      if (!ok) {
        return
      }
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
  }

  completeInvoice(id: string): void {
    const invoice = this.findInvoice(id)
    if (invoice) {
      invoice.setStatus(EInvoiceStatus.Closed)
    }
  }

  startInventory(id: string): void {
    // Logic to start inventory
  }

  finishInventory(id: string): void {
    // Logic to finish inventory
  }
}
