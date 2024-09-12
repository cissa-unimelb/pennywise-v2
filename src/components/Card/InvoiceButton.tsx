import * as React from 'react';
import Button from '@mui/material/Button';
import { InvoiceSchema, StatusEnum, UpdateInvoice } from '../../database/invoice';

type InvoiceButtonProps = {
    invoice: InvoiceSchema,
    status: StatusEnum
}

export default function InvoiceButton({
    invoice,
    status
}: InvoiceButtonProps) {

  let color = "red";

  if (status === "Approve"){
    color = "green";
  }


  return (
    <React.Fragment>
      <Button variant="contained" 
        size="small"
        style={{
            margin: "10px",
            backgroundColor: color
        }}
        onClick={() => {
            UpdateInvoice(invoice.invoice_id, {status: status});
        }}>

        <b>{status}</b>
    
      </Button>
    </React.Fragment>
  );
}