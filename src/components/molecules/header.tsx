import { Link } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { MdOutlineAccountCircle } from "react-icons/md";

export function Header() {
  const user = useCurrentUser();
  return (
    <header className="bg-white w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 rounded-md">
      <nav className="flex flex-wrap justify-center sm:justify-start gap-6 text-sm sm:text-base">
        <Link to="/user" className="hover:opacity-50 transition duration-200">
          ポケモン一覧
        </Link>
        <Link
          to="/favorite"
          className="hover:opacity-50 transition duration-200"
        >
          お気に入り一覧
        </Link>
      </nav>

      <div className="text-sm sm:text-base text-gray-700">
        {user ? (
          <span className="flex items-center gap-2">
            <MdOutlineAccountCircle className="text-xl sm:text-2xl" />
            {user.email}
          </span>
        ) : (
          <span>未ログイン</span>
        )}
      </div>
    </header>
  );
}
