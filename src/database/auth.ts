import {app} from "../config";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import {createUser, User} from "../auth/types";


const db = getFirestore(app);


export async function setUser(user: User){
   // hack to remove the user token
   user.token = undefined;
   const res = await setDoc(doc(db, "users", user.id), user);
   return res;
}


export async function getUser(userId: string): Promise<User> {

  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return createUser(docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    throw new Error("no user found");
  }
}


export async function checkUserExists(userId: string): Promise<boolean>{
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    return docSnap.exists();
}