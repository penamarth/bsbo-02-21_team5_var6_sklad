import { Stock } from "../domain/Stock"

export class Program {
  public main() {
    const stock = new Stock()
    stock.startInventory("0")
    stock.preformInventory()
    stock.scanItem("0")
    stock.enterQuantity("0", 10)
    stock.finishInventory("0")
  }
}
