import { useAtom } from "jotai";
import { LoginAuth } from "../atoms/loginAuth";
import { emailAtom, passwordAtom } from "../../atom";
import { Input } from "../atoms/Input/input";
import { Button } from "../atoms/Button/button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);

  const handleLogin = async () => {
    await LoginAuth(email, password, navigate);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-900">
      <div className="flex flex-col bg-white gap-10 rounded-full px-20 py-15 md:p-30">
        <h1 className="text-2xl font-bold md:text-4xl">ポケモン図鑑ログイン</h1>
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
        <Button onClick={handleLogin}>ログイン</Button>
      </div>
    </div>
  );
}
