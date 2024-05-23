import { Stock } from '../domain/Stock'
import { Storekeeper } from '../domain/Storekeeper'
import { Item } from '../domain/Item'
import { StockItem } from '../domain/StockItem'
import { ExpenditureInvoice } from '../domain/Invoice'
import { InvoiceLineItem } from '../domain/InvoiceLineItem'

export class Program {
    public main() {
        const stock = new Stock()

        const storekeeper = new Storekeeper('1', stock)

        const item1 = new Item('1', 'Item 1', 'Pencil II', '1')
        const item2 = new Item('2', 'Item 2', 'Pencil II', '2')

        const stockItem1 = new StockItem('1', 100, item1)
        const stockItem2 = new StockItem('2', 200, item2)

        const invoice = new ExpenditureInvoice('1')
        invoice.lineItems.push(new InvoiceLineItem(10, item1))
        invoice.lineItems.push(new InvoiceLineItem(20, item2))

        stock['invoices'].push(invoice)

        storekeeper.openInvoice('1')
    }
}