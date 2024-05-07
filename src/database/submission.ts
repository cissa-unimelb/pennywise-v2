import {app} from "../config";
import {getFirestore, doc, setDoc, getDoc, collection} from "firebase/firestore";
import {createUser, User} from "../auth/types";

const db = getFirestore(app);


interface SubmissionInvoice {
  description: string;
  amount: string;
}

// submission schema
interface Submission {
  // foreign key for the account name, bsb, account number
  userid: string;
  // name of event
  event: string;
  // short description
  description: string;
  // items
  invoices: SubmissionInvoice[];
  // time of purchase
  purchaseDate: Date;
  // receipt url
  receiptUrl: string;
  // additional information
  additional: string;
}

// create a submission for the target user id
export async function addSubmission(submission: Submission) {
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
  const ref = doc(collection(db, "submissions"));
  await setDoc(ref, submission);
}


export async function getActiveSubmissions() {

}