import { Stock } from './Stock'

export class Storekeeper {
  private id: string
  private stock: Stock

  constructor(id: string, stock: Stock) {
    this.id = id
    this.stock = stock
  }

  openInvoice(invoice_id: string): void {
    this.stock.postInvoice(invoice_id)
  }

  completeInvoice(invoice_id: string): void {
    this.stock.completeInvoice(invoice_id)
  }

  requestAssembling(): void {
    // Logic to request assembling
  }
}
