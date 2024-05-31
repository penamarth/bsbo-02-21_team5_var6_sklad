import { Stock } from "../domain/Stock"

export class Program {
  public main() {
    const stock = new Stock()
    stock.requestOrder()
    stock.startMovementOrder("0")
  }
}
