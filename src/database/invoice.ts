export interface InvoiceSchema {
    invoice_id: string;
    recipient: string;
    recipient_abn: string;
    recipient_address: string;
    items: {
      description: string;
      amount: string;
    }[];
}