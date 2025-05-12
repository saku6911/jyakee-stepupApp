import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/firebase";

export async function LoginAuth(
  email: string,
  password: string,
  navigate: (path: string) => void
) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("ログイン成功:", userCredential.user);
    navigate("/user");
  } catch (error: unknown) {
    if (error instanceof Error) {
      alert("ログインに失敗しました");
    } else {
      alert("ログインに失敗しました");
    }
  }
}
