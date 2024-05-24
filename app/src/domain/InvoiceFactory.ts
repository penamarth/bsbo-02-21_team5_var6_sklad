import { Invoice } from "./Invoice";
import { ExpenditureInvoice } from "./Invoice";
import { ReceiptInvoice } from "./Invoice";

export interface InvoiceFactory {
    createInvoice(): Invoice;
}

export class ExpenditureInvoiceFactory implements InvoiceFactory {
    createInvoice(): Invoice {
        return new ExpenditureInvoice();
    }
}

export class ReceiptInvoiceFactory implements InvoiceFactory {
    createInvoice(): Invoice {
        return new ReceiptInvoice();
    }
}