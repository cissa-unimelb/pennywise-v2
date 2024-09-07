import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  runTransaction,
  where,
  Transaction,
  setDoc, orderBy, serverTimestamp
} from 'firebase/firestore';
import {app} from "../config";

export interface InvoiceSchema {
  timestamp: Date;
  invoice_id: string;
  recipient: string;
  recipient_abn: string;
  recipient_address: string;
  items: {
    description: string;
    amount: string;
  }[];
  driveUrl: string;
  status: "Active" | "Approve" | "Reject"
}

export interface Incrementor {
  type: string;
  value: number;
}

const db = getFirestore(app);

export function NewInvoice(invoice: Partial<InvoiceSchema>) : InvoiceSchema {
  return {
    invoice_id: "",
    items: [],
    recipient: "",
    recipient_abn: "",
    recipient_address: "",
    timestamp: new Date(),
    driveUrl: "",
    status: "Active",
    ...invoice
  };
}

/**
 * Finds the invoice id incrementor, create a new one if not found
 */
async function FindInvoiceId() {
  // find incrementor id
  const q = query(
    collection(db, "ids"),
    where("type", "==", "invoices")
  );
  const d = await getDocs(q);
  if (d.docs.length === 0) {
    // create it
    const ref = doc(collection(db, "ids"));
    await setDoc(ref, {
      type: 'invoices',
      value: 1_000_000
    });
    return ref;
  }
  return d.docs[0].ref;
}

/**
 * Use the invoice id in a transaction, uses a callback that is called with the id and transaction
 * @param update Callback
 */
export async function UseInvoiceId(update: (id: number, transaction: Transaction) => void) {
  // find incrementor id
  const ref = await FindInvoiceId();
  await runTransaction(db, async (transaction) => {
    // read incrementor using transaction
    const idDoc = await transaction.get(ref);
    const ids = idDoc.data() as Incrementor;
    const invoiceId = ids.value;

    // write documents
    update(invoiceId, transaction);

    // update id
    transaction.set(ref, {type: ids.type, value: ids.value + 1});
  });
}

/**
 * Create an invoice in the database
 * @param invoice
 */
export async function CreateInvoice(invoice: InvoiceSchema) {
  // create new document
  const ref = doc(collection(db, "invoice"));

  // write it using new id
  await UseInvoiceId(async (id, transaction) => {
    transaction.set(ref, {
      ...invoice,
      invoice_id: ""+id,
      timestamp: serverTimestamp()
    });
  });
}

/**
 * Returns all the pending invoices
 */
export async function GetPendingInvoices() {
  const q = query(
    collection(db, "invoice"),
    where("status", "==", "Active"),
    orderBy("timestamp", "desc")
  );

  const snapshot = await getDocs(q);
  const result: InvoiceSchema[] = snapshot.docs.map(doc => {
    const data = doc.data();
    data.timestamp = data.timestamp.toDate();
    return data as InvoiceSchema;
  });
  return result;
}

/**
 * Returns all the invoices
 */
export async function GetInvoices() {
  const q = query(
    collection(db, "invoice"),
    orderBy("timestamp", "desc")
  );

  const snapshot = await getDocs(q);
  const result: InvoiceSchema[] = snapshot.docs.map(doc => {
    const data = doc.data();
    data.timestamp = data.timestamp.toDate();
    return data as InvoiceSchema;
  });
  return result;
}

/**
 * Returns all the invoices
 */
export async function GetInvoicesByTime(starting: Date) {
  const q = query(
    collection(db, "invoice"),
    where("timestamp", ">=", starting),
    orderBy("timestamp", "desc")
  );

  const snapshot = await getDocs(q);
  const result: InvoiceSchema[] = snapshot.docs.map(doc => {
    const data = doc.data();
    data.timestamp = data.timestamp.toDate();
    return data as InvoiceSchema;
  });
  return result;
}


