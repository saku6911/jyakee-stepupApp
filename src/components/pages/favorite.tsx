import { useEffect } from "react";
import { auth, db } from "../../api/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Header } from "../molecules/header";
import LoadingCircleSpinner from "../atoms/LoadingCircleSpinner";
import { Link } from "react-router-dom";
import { PokemonSummary } from "../../types";
import { useAtom } from "jotai";
import { errorAtom, favoritesAtom, loadingAtom, userAtom } from "../../atom";
import NoData from "./noData";

export default function Favorite() {
  const [user, setUser] = useAtom(userAtom);
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [setUser, setFavorites, setLoading, setError]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        setLoading(true);
        try {
          const favoritesCollection = collection(
            db,
            "users",
            user.uid,
            "favorites"
          );
          const snapshot = await getDocs(favoritesCollection);
          const favoritesList = snapshot.docs.map(
            (doc) => doc.data() as PokemonSummary
          );
          setFavorites(favoritesList);
        } catch (error) {
          setError("お気に入りの取得に失敗しました");
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (user) {
      fetchFavorites();
    }
  }, [user, setLoading, setError, setUser, setFavorites]);

  if (loading) {
    return <LoadingCircleSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!favorites.length) {
    return <NoData />;
  }
  const typeTranslations: { [key: string]: string } = {
    normal: "ノーマル",
    fire: "ほのお",
    water: "みず",
    electric: "でんき",
    grass: "くさ",
    ice: "こおり",
    fighting: "かくとう",
    poison: "どく",
    ground: "じめん",
    flying: "ひこう",
    psychic: "エスパー",
    bug: "むし",
    rock: "いわ",
    ghost: "ゴースト",
    dragon: "ドラゴン",
    dark: "あく",
    steel: "はがね",
    fairy: "フェアリー",
  };
  return (
    <>
      <Header />
      <div className="flex flex-col gap-10 items-center  min-h-screen bg-red-900 px-4 py-10 sm:px-6 md:px-10 lg:px-20">
        <h1 className="text-white font-bold text-2xl md:text-4xl">
          お気に入り一覧
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl bg-white p-6 sm:p-10 rounded shadow">
          {favorites.map((poke: PokemonSummary) => (
            <Link to={`/pokemon/${poke.name}`} key={poke.name}>
              <div className="text-center hover:scale-105 transition-transform duration-200">
                <img
                  loading="lazy"
                  src={poke.image}
                  alt={poke.name}
                  className="mx-auto w-[120px] sm:w-[150px] md:w-[180px] lg:w-[200px]"
                />
                <p className="mt-2 font-semibold">
                  {poke.jaName} ({poke.name})
                </p>
                <p className="text-sm text-gray-600">
                  タイプ：
                  {poke.types
                    .map((type) => typeTranslations[type] || type)
                    .join(", ")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
