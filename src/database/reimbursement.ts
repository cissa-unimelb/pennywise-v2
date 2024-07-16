import {app} from "../config";
import {getFirestore, doc, setDoc, getDoc, getDocs, collection, query, where, orderBy} from "firebase/firestore";
import {createUser, User} from "../auth/types";

const db = getFirestore(app);

export type DepartmentEnum = "IT" | "Events" | "Competition" | "Education" | "Industry" | "Project" | "Diversity" | "Publicity" | "Product";
export const DEPARTMENTS = ["IT", "Events", "Competition", "Education", "Industry", "Project", "Diversity", "Publicity", "Product"];

// submission schema
export interface Reimbursement {
  // foreign key for the account name, bsb, account number
  userid: string;
  // name of event
  event: string;
  // short description
  description: string;
  // items
  amount: string;
  // time of purchase
  purchaseDate: Date;
  // receipt url
  receiptUrl: string;
  // additional information
  additional: string;

  department: DepartmentEnum

  state: "Active" | "Reviewed" | "Completed";
}


// create a submission for the target user id
export async function addReimbursement(submission: Reimbursement) {
  // get user information first
  const userDoc = await getDoc(doc(db, "users", submission.userid));
  if (!userDoc.exists()) {
    throw new Error("no user found");
  }

  const userData = userDoc.data();
  const user = createUser(userData);

  // if lacking banking information
  if (user.accountNum == null || user.bsb == null) {
    throw new Error("no banking information found");
  }

  // store the document
  const ref = doc(collection(db, "reimbursement"));
  try {
    await setDoc(ref, submission);
  } catch (e){
    console.log((e as Error).message);
    throw new Error("Error while uploading the submission to DB");
  }
  
}

// returns the list of all active reimbursements
export async function getActiveReimbursement(): Promise<Reimbursement[]> {
  const q = query(
    collection(db, "reimbursement"),
    where("state", "==", "Active"),
    orderBy("purchaseDate", "desc")
  );

  const snapshot = await getDocs(q);
  let result: Reimbursement[] = [];
  snapshot.forEach(res => {
    let data = res.data();
    data.purchaseDate = data.purchaseDate.toDate();
    result.push(data as Reimbursement);
  })
  return result;
}

// returns the list of active reimbursements by me
export async function getMyReimbursement(user: User): Promise<Reimbursement[]> {
  const q = query(
    collection(db, "reimbursement"),
    where("state", "==", "Active"),
    where("userid", "==", user.id),
    orderBy("purchaseDate", "desc")
  );

  const snapshot = await getDocs(q);
  let result: Reimbursement[] = snapshot.docs.map(res => {
    let data = res.data();
    data.purchaseDate = data.purchaseDate.toDate();
    return (data as Reimbursement);
  });
  return result;
}