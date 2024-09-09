import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {app} from "../config";
import {User} from "./types";

/**
 * Try firebase relogin on a new page refresh by returning the user object if successful
 */
export async function retainSession(): Promise<User> {
  return new Promise((resolve, reject) => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // gets user id token
        const token = await user.getIdToken();
        console.log("User id token: ", token);

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
        resolve(result);
      } else {
        reject();
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