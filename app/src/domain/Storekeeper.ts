import { Log } from "../services/logger"
import { Assembler } from "./Assembler"
import { Stock } from "./Stock"

@Log()
export class Storekeeper implements Assembler {
  private id: string
  private stock: Stock

  constructor(id: string, stock: Stock) {
    this.id = id
    this.stock = stock
  }

  incomingAssembladge(): void {}

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
