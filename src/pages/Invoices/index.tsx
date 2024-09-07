import Button from "@mui/material/Button";
import {CreateInvoice, GetPendingInvoices, InvoiceSchema, NewInvoice} from "../../database/invoice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import styles from './invoices.module.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

function InvoiceCard({invoice}: { invoice: InvoiceSchema }) {
  return <div className={styles.invoice}>
    <Card>
      <CardContent>
        <Typography variant="h5">
          {invoice.invoice_id}
        </Typography>
        <Typography>
          Date: {invoice.timestamp.toLocaleString()}
        </Typography>
        <Typography>
          Recipient: {invoice.recipient}
        </Typography>
        <Typography>
          ABN: {invoice.recipient_abn}
        </Typography>
        <Typography>
          Address: {invoice.recipient_address}
        </Typography>
        <Typography>
          Drive URL: {invoice.driveUrl}
        </Typography>
        <div>
          <Typography>Items</Typography>
          <List>
            {invoice.items.map((item, i) => (
              <ListItem key={i}>{item.description} | {item.amount}</ListItem>
            ))}
          </List>
        </div>
      </CardContent>
    </Card>
  </div>;
}

const def = `
{
  "items": [
    {
      "description": "testing",
      "amount": "20"
    }
  ],
  "recipient": "",
  "recipient_abn": "",
  "recipient_address": ""
}
    `;

export function Invoices() {
  const [text, setText] = useState<string>("");
  const [pendingInvoices, setPendingInvoices] = useState<InvoiceSchema[]>([]);

  useEffect(() => {
    let out = localStorage.getItem('temptext');
    if (out == null) {
      localStorage.setItem("temptext", def);
      out = def;
    }
    setText(out);
  }, []);


  useEffect(() => {
    GetPendingInvoices()
      .then(setPendingInvoices);
  }, []);

  const createInvoice = () => {
    CreateInvoice(NewInvoice(JSON.parse(text)));
  };

  return <div className={styles.page}>
    <Typography variant="h3">Invoices</Typography>
    <br/>
    <div>
      <textarea
        value={text}
        onChange={e => {
          setText(e.target.value); localStorage.setItem('temptext', e.target.value);
        }}
      />
      <div>
        <Button onClick={createInvoice} variant="contained">ADD</Button>
        <Button onClick={() => {
          setText(def);
          localStorage.setItem("temptext", def);
        }} variant="contained">Clear</Button>
      </div>
    </div>
    <br/>
    <br/>
    <div className={styles.board}>
      <div>
        <Typography variant="h4">Pending</Typography>
        <br/>
        {pendingInvoices.map((invoice, i) => <InvoiceCard invoice={invoice} key={i}/>)}
      </div>
      <div>
        <Typography variant="h4">Approved</Typography>
        <br/>
        {pendingInvoices.map((invoice, i) => <InvoiceCard invoice={invoice} key={i}/>)}
      </div>
      <div>
        <Typography variant="h4">Rejected</Typography>
        <br/>
        {pendingInvoices.map((invoice, i) => <InvoiceCard invoice={invoice} key={i}/>)}
      </div>
    </div>
  </div>
}