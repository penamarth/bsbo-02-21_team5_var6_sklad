import { StockItem } from './StockItem'
import { Invoice } from './Invoice'
import { Assembling } from './Assembling'
import { EInvoiceStatus } from './Enums'

export class Stock {
  private invoices: Invoice[] = []
  private assemblings: Assembling[] = []
  private stockItems: StockItem[] = []

  findItem(id: string): StockItem | undefined {
    return this.stockItems.find(item => item.id === id)
  }

  findInvoice(id: string): Invoice | undefined {
    return this.invoices.find(invoice => invoice.id === id)
  }

  findAssembling(id: string): Assembling | undefined {
    return this.assemblings.find(assembling => assembling.id === id)
  }

  postInvoice(id: string): void {
    const invoice = this.findInvoice(id)
    if (invoice) {
      invoice.setStatus(EInvoiceStatus.Handling)
    }
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
