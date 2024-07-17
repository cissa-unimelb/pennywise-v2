import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import {User} from "./types";
import {app} from "../config";

interface AuthCallback {
  (user: User): void;
}

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/drive");
provider.addScope("https://www.googleapis.com/auth/drive.file");
provider.addScope("https://www.googleapis.com/auth/drive.resource");
const auth = getAuth(app);

export async function googleSignIn(): Promise<User> {
  const result: UserCredential = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  
  const token = credential?.accessToken;
  if (isEmailValid(result.user.email)) {
    console.log(result.user);
  } else {
    throw new Error("Please login using CISSA account");
  }

  return {
    id: result.user.uid,
    name: result.user.displayName ?? "",
    email: result.user.email ?? "",
    isAuthorizer: false,
    isTreasurer: false,
    photoURL: result.user.photoURL ?? "",
    token: token ?? "",
  };
}

export function isEmailValid(email: string | null): boolean {
  try {
    if (email?.split("@")[1] !== "cissa.org.au") {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}
