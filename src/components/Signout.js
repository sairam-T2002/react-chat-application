import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function SignOut() {
  return (
    auth.currentUser && <button onClick={() => signOut(auth)}>Sign out</button>
  );
}
