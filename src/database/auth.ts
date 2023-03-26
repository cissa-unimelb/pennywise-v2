import {app} from "../config";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import {User} from "../auth/types";


const db = getFirestore(app);


export async function setUser(user: User){
   const res = await setDoc(doc(db, "users", user.id), user);
   return res;
}


export async function getUser(userId: string){

  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return null;
  }
}


export async function checkUserExists(userId: string): Promise<boolean>{
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    return docSnap.exists();
}