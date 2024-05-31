import { Stock } from "../domain/Stock"

export class Program {
  public main() {
    const stock = new Stock()
    stock.startAssembling("0")
    stock.pickItem("0")
    stock.complemeAssembling()
  }
}
