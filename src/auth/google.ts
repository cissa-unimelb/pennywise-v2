import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { User } from "./types";
import { app } from "../config";

interface AuthCallback {
  (user: User): void;
}

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export function googleSignIn(onSuccess: AuthCallback, onError: Function): void {
  signInWithPopup(auth, provider)
    .then((result: UserCredential) => {
      console.log(result);
      onSuccess({
        id: result.user.uid,
        name: result.user.displayName ?? "",
        email: result.user.email ?? "",
        isAuthorizer: false,
        isTreasurer: false,
        photoURL: result.user.photoURL ?? "",
      });
    })
    .catch((error) => {
      onError(error);
    });
}
