import { Stock } from "../domain/Stock"

export class Program {
  public main() {
    const stock = new Stock()
    stock.openInvoice("0")
    stock.confirmInvoiceItem("0", "0")
    stock.completeInvoice("0")
  }
}
