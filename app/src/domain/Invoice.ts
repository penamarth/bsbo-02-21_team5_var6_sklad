import { InvoiceLineItem } from './InvoiceLineItem'
import { EInvoiceStatus } from './Enums'
import { Item } from "./Item"
import { Log } from "../services/logger"

export interface Invoice {
  id: string
  lineItems: InvoiceLineItem[]
  status: EInvoiceStatus

  getTotalItems(): number
  getItems(): Item[]
  setStatus(status: EInvoiceStatus): void
  getItem(article: string, serial_no: string): InvoiceLineItem | undefined
}

@Log()
export class ExpenditureInvoice implements Invoice {
  id: string
  lineItems: InvoiceLineItem[]
  status: EInvoiceStatus = EInvoiceStatus.Pending

  constructor(id: string, lineItems: InvoiceLineItem[]) {
    this.id = id
    this.lineItems = lineItems
  }

  getTotalItems(): number {
    return this.lineItems.reduce((total, item) => total + item.quantity, 0)
  }

  getItems(): Item[] {
    return this.lineItems.map((lineItem) => lineItem.getItems())
  }

  setStatus(status: EInvoiceStatus): void {
    this.status = status
  }

  getItem(article: string, serial_no: string): InvoiceLineItem | undefined {
    return this.lineItems.find(
      (lineItem) =>
        lineItem.item.article === article &&
        lineItem.item.serial_no === serial_no
    )
  }
}

@Log()
export class ReceiptInvoice implements Invoice {
  id: string
  lineItems: InvoiceLineItem[] = []
  status: EInvoiceStatus = EInvoiceStatus.Pending

  constructor(id: string) {
    this.id = id
  }

  getTotalItems(): number {
    return this.lineItems.reduce((total, item) => total + item.quantity, 0)
  }

  getItems(): Item[] {
    return this.lineItems.map((lineItem) => lineItem.getItems())
  }

  setStatus(status: EInvoiceStatus): void {
    this.status = status
  }

  getItem(article: string, serial_no: string): InvoiceLineItem | undefined {
    return this.lineItems.find(
      (lineItem) =>
        lineItem.item.article === article &&
        lineItem.item.serial_no === serial_no
    )
  }
}
