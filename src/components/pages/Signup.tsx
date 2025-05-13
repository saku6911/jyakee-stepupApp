import { useAtom } from "jotai";
import { emailAtom, passwordAtom } from "../../atom";
import { Input } from "../atoms/Input/input";
import { Button } from "../atoms/Button/button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { SignupAuth } from "../../api/auth";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);

  const handleSignup = async () => {
    await SignupAuth(email, password, navigate);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-900">
      <div className="flex flex-col bg-white gap-5 rounded-full px-20 py-10 sm:px-40 sm:py-25 sm:gap-10 lg:py-40 lg:px-55 lg:gap-10">
        <h1 className="text-2xl font-bold md:text-4xl">新規登録</h1>
        <div className="flex flex-col gap-4">
          <Input
            type="email"
            value={email}
            placeholder="メールアドレス"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            value={password}
            placeholder="パスワード"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button onClick={handleSignup}>登録する</Button>
        <Link
          to="/"
          className="text-center hover:opacity-50 transition duration-200 underline"
        >
          ログイン画面に戻る
        </Link>
      </div>
    </div>
  );
}
