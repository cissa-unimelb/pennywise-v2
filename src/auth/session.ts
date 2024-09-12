import {
  getAuth,
  GoogleAuthProvider,
  reauthenticateWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {app} from "../config";
import {User} from "./types";
import {isEmailValid, provider} from "./google";

/**
 * Retrieves the google access token by signing in the user again
 */
export async function retrieveToken() {
  const auth = getAuth(app);
  if (auth.currentUser == null) {
    throw new Error("user not signed in");
  }

  const result = await reauthenticateWithPopup(auth.currentUser, provider);
  if (result == null || !isEmailValid(result.user.email)) {
    throw new Error("could not authenticate")
  }

  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential?.accessToken;
  if (token == null) {
    throw new Error("no access token");
  }

  return token;
}

/**
 * Try firebase relogin on a new page refresh by returning the user object if successful
 */
export async function retainSession(): Promise<User> {
  return new Promise((resolve, reject) => {
    const auth = getAuth(app);
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // create user
        const result = {
          id: user.uid,
          name: user.displayName ?? "",
          email: user.email ?? "",
          isAuthorizer: false,
          isTreasurer: false,
          photoURL: user.photoURL ?? ""
        };
        unsub();
        resolve(result);
      } else {
        unsub();
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