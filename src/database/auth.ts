import {app} from "../config";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import {User} from "../auth/types";


const db = getFirestore(app);

export async function setUser(user: User){
    return await setDoc(doc(db, "users", user.id), user);
}

export async function checkUserExists(userId: string): Promise<boolean>{
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    return docSnap.exists();
}