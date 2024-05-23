import { InvoiceLineItem } from './InvoiceLineItem'
import { EInvoiceStatus } from './Enums'

export interface Invoice {
  id: string
  lineItems: InvoiceLineItem[]
  status: EInvoiceStatus

  getTotalItems(): number
  setStatus(status: EInvoiceStatus): void
  getItem(article: string, serial_no: string): InvoiceLineItem | undefined
}

export class ExpenditureInvoice implements Invoice {
  id: string
  lineItems: InvoiceLineItem[] = []
  status: EInvoiceStatus = EInvoiceStatus.Pending

  constructor(id: string) {
    this.id = id
  }

  getTotalItems(): number {
    return this.lineItems.reduce((total, item) => total + item.quantity, 0)
  }

  setStatus(status: EInvoiceStatus): void {
    this.status = status
  }

  getItem(article: string, serial_no: string): InvoiceLineItem | undefined {
    return this.lineItems.find(lineItem => lineItem.item.article === article && lineItem.item.serial_no === serial_no)
  }
}

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

  setStatus(status: EInvoiceStatus): void {
    this.status = status
  }

  getItem(article: string, serial_no: string): InvoiceLineItem | undefined {
    return this.lineItems.find(lineItem => lineItem.item.article === article && lineItem.item.serial_no === serial_no)
  }
}
