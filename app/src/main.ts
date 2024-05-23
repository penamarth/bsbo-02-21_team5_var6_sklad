import { HelloSayer } from "./hello"

export class Program {
    public main() {
        const helloSayer = new HelloSayer()
        helloSayer.say()
    }
}