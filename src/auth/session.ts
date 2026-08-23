import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {app} from "../config";
import {User} from "./types";

/**
 * Try firebase relogin on a new page refresh by returning the user object if successful
 */
export async function retainSession(): Promise<User> {
  return new Promise((resolve, reject) => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // gets user id token
          const token = await user.getIdToken();

          // create user
          const result = {
            id: user.uid,
            name: user.displayName ?? "",
            email: user.email ?? "",
            isAuthorizer: false,
            isTreasurer: false,
            photoURL: user.photoURL ?? "",
            token: token ?? "",
          };
          unsubscribe();
          resolve(result);
        } catch (err) {
          unsubscribe();
          reject(err);
        }
      } else {
        unsubscribe();
        reject(new Error("No persisted Firebase session"));
      }
    });
  });
}

/**
 * Local firebase session logout
 */
export async function logoutSession() {
  const auth = getAuth(app);
  return signOut(auth);
}
