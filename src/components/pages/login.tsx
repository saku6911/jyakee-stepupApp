import { useAtom } from "jotai";
import { emailAtom, passwordAtom } from "../../atom";
import { LoginAuth } from "../atoms/loginAuth";
import { Input } from "../atoms/Input/input";
import { Button } from "../atoms/Button/button";
import { useNavigate, Link } from "react-router-dom";
import React, { memo, useCallback } from "react";

// 入力ボックスのメモ化コンポーネント（関数外に定義）
const EmailInput = React.memo(function EmailInput({
  email,
  setEmail,
}: {
  email: string;
  setEmail: (val: string) => void;
}) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    [setEmail]
  );
  return (
    <Input
      type="email"
      value={email}
      placeholder="メールアドレス"
      onChange={handleChange}
    />
  );
});

const PasswordInput = React.memo(function PasswordInput({
  password,
  setPassword,
}: {
  password: string;
  setPassword: (val: string) => void;
}) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    [setPassword]
  );
  return (
    <Input
      type="password"
      value={password}
      placeholder="パスワード"
      onChange={handleChange}
    />
  );
});

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);

  const handleLogin = useCallback(async () => {
    await LoginAuth(email, password, navigate);
  }, [email, password, navigate]);

  const ButtonMemo = memo(() => (
    <Button onClick={handleLogin}>ログイン</Button>
  ));

  const LinkMemo = memo(() => (
    <Link
      to="/signup"
      className="text-center hover:opacity-50 transition duration-200 underline"
    >
      新規登録
    </Link>
  ));

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-900">
      <div className="flex flex-col bg-white gap-5 rounded-full px-20 py-10 sm:px-40 sm:py-25 sm:gap-10 lg:py-40 lg:px-50 lg:gap-10">
        <h1 className="text-2xl font-bold md:text-4xl">ポケモン図鑑ログイン</h1>
        <div className="flex flex-col gap-4">
          <EmailInput email={email} setEmail={setEmail} />
          <PasswordInput password={password} setPassword={setPassword} />
        </div>
        <ButtonMemo />
        <LinkMemo />
      </div>
    </div>
  );
}
