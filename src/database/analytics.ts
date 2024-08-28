import {DEPARTMENTS, getActiveReimbursement, ReimbursementRead} from "./reimbursement";
import {app} from "../config";
import {
  getFirestore,
  getDocs,
  collection,
  query,
} from "firebase/firestore";
import {User} from "../auth/types";
import {getUser} from "./auth";

const db = getFirestore(app);

export interface DepartmentStatistics {
  name: string;
  quantity: number;
  totalPrice: string;
  highestPrice: string;
}

namespace Finance {
  export function priceToNumber(price: string): number {
    if (!price.includes('.')) {
      return parseInt(price, 10) * 100;
    }

    const [left, right] = price.split('.');
    return parseInt(left, 10) * 100 + parseInt(right.slice(0, Math.min(right.length, 2)), 10);
  }

  export function numberToPrice(num: number): string {
    return Math.floor(num / 100).toString().padStart(1, '0') + '.' + (num % 100).toString().padStart(2, '0');
  }

  export function addPrice(price1: string, price2: string): string {
    return numberToPrice(priceToNumber(price1) + priceToNumber(price2));
  }

  export function maxPrice(price1: string, price2: string): string {
    const p1 = priceToNumber(price1);
    const p2 = priceToNumber(price2);

    return (p1 > p2) ? numberToPrice(p1) : numberToPrice(p2);
  }
}

/**
 * Gets the department statistics for all active reimbursements
 */
export async function activeReimbursementDepartmentStatistics(): Promise<Record<string, DepartmentStatistics>> {
  const reimbursements = await getActiveReimbursement();

  let result: Record<string, DepartmentStatistics> = {}
  for (const department of DEPARTMENTS) {
    const departmentReimbursements = reimbursements
      .filter(reim => reim.department === department);

    // aggregate
    const totalPrice = departmentReimbursements
      .reduce((acc, reim) => Finance.addPrice(acc, reim.amount), '0.00');

    const highestPrice = departmentReimbursements
      .reduce((acc, reim) => Finance.maxPrice(acc, reim.amount), '0.00');

    const quantity = departmentReimbursements.length;

    result[department] = {
      name: department,
      quantity,
      totalPrice,
      highestPrice
    };
  }

  return result;
}


export interface SpreadSheetRow {
  fullname: string;
  accountName: string;
  accountNumber: string;
  bsb: string;
  event: string;
  description: string;
  purchaseDate: string,
  amount: string;
  receipt: string;
  additional: string;
  status: string;
}

/**
 * Cleans the csv text
 * @param text
 */
function escapeCsv(text: string) {
  // replace " with ""
  return text.replaceAll("\"", "\"\"");
}

/**
 * Stringify a spreadsheet
 * @param names Column names
 * @param columns Dictionary names
 * @param rows List of dictionaries
 */
function csvWriter<T extends Record<keyof T, string>>(names: string[], columns: (keyof T)[], rows: T[]) {
  const spreadsheet = rows.map((data) => {
    let out = [];
    for (const col of columns) {
      out.push(escapeCsv(data[col]));
    }
    return out.join(',');
  }).join('\n');
  const header = names.map(escapeCsv).join(',');
  return header + '\n' + spreadsheet;
}

/**
 * Generates a full excel spreadsheet
 */
export async function getSpreadSheetExport(): Promise<string> {
  /**
   * Timestamp (nope),
   * Full name,
   * Bank account name
   * have you submitted your bank account before (nope)
   * what event was with for
   * description of purchase
   * purchase date
   * purchase amount
   * receipt upload
   * is there anything you would like me to know
   * bsb
   * account no
   * initiated? (replaced with status)
   */

    // fetch all receipts, fetch all users, join here in js
  const reimbursementQuery = query(
      collection(db, 'reimbursement')
    );
  const reimbursements = (await getDocs(reimbursementQuery)).docs.map(res => {
    let data = res.data();
    data.docId = res.id;
    data.purchaseDate = data.purchaseDate.toDate();
    return (data as ReimbursementRead);
  });

  const users: Record<string, User> = {};
  const rows: SpreadSheetRow[] = [];
  for (const row of reimbursements) {
    if (!Object.hasOwn(users, row.userid)) {
      users[row.userid] = await getUser(row.userid);
    }
    const user = users[row.userid];
    rows.push({
      purchaseDate: row.purchaseDate.toLocaleDateString(),
      fullname: user.name,
      accountName: user.name,
      bsb: user.bsb ?? "",
      accountNumber: user.accountNum ?? "",
      description: row.description,
      event: row.event,
      amount: row.amount,
      additional: row.additional,
      receipt: row.receiptUrl,
      status: row.state,
    });
  }

  const columns: (keyof SpreadSheetRow)[] = [
    'purchaseDate', 'fullname', 'accountName', 'event', 'description',
    'amount', 'receipt', 'additional', 'bsb', 'accountNumber', 'status'
  ];
  const columnsNames: string[] = [
    'Purchase Date', 'Full Name', 'Bank account name (the name that your account is under)', 'What event was with for?',
    'Description of purchase', 'Purchase amount (AUD)', 'Receipt upload (please upload pdf)',
    'Is there anything you would like to let me know?', 'BSB', 'Account No', 'initiated?'
  ];
  return csvWriter(columnsNames, columns, rows);
}