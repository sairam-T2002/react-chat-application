import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign" onClick={() => signOut(auth)}>
        Sign out
      </button>
    )
  );
}
