import { Link } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { MdOutlineAccountCircle } from "react-icons/md";

export function Header() {
  const user = useCurrentUser();
  return (
    <header className="bg-white flex justify-between w-5/6 h-20 items-center rounded-md mx-auto">
      <div className="flex gap-10">
        <Link to="/user" className="hover:opacity-50 transition duration-200">
          ポケモン一覧
        </Link>
        <Link
          to="/favorite"
          className="hover:opacity-50 transition duration-200"
        >
          お気に入り一覧
        </Link>
      </div>
      <div>
        {user ? (
          <span className="flex gap-2 items-center">
            <MdOutlineAccountCircle className="text-3xl" /> {user.email}
          </span>
        ) : (
          <span>未ログイン</span>
        )}
      </div>
    </header>
  );
}
