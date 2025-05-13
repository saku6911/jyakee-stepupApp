import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { NavigateFunction } from "react-router-dom";

export const SignupAuth = async (
  email: string,
  password: string,
  navigate: NavigateFunction
) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("登録が完了しました");
    navigate("/");
  } catch (error: unknown) {
    if (error instanceof Error) {
      alert(`登録エラー: ${error.message}`);
    } else {
      alert("不明なエラーが発生しました");
    }
  }
};
