import { useEffect, useState, useCallback } from "react";
import { User } from "firebase/auth";
import { auth, db } from "../../api/firebase";
import { setDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { useAtom } from "jotai";
import { isFavoriteAtom } from "../../atom";
import { PokemonSummary } from "../../types";
import { motion, AnimatePresence } from "motion/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type Props = {
  pokemon: PokemonSummary;
};

const getFavoriteRef = (user: User, pokemonName: string) =>
  doc(db, "users", user.uid, "favorites", pokemonName);

const addFavorite = async (user: User, pokemon: PokemonSummary) => {
  const ref = getFavoriteRef(user, pokemon.name);
  await setDoc(ref, pokemon);
};

const removeFavorite = async (user: User, pokemonName: string) => {
  const ref = getFavoriteRef(user, pokemonName);
  await deleteDoc(ref);
};

export default function FavoriteButton({ pokemon }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isFavorite, setIsFavorite] = useAtom(isFavoriteAtom);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!user) return;
      const ref = getFavoriteRef(user, pokemon.name);
      const docSnap = await getDoc(ref);
      setIsFavorite(docSnap.exists());
    };
    checkFavorite();
  }, [user, pokemon.name, setIsFavorite]);

  const handleFavorite = useCallback(async () => {
    if (!user) {
      alert("ログインしてください");
      return;
    }

    const dataToSave: PokemonSummary = {
      name: pokemon.name,
      jaName: pokemon.jaName ?? pokemon.name,
      id: pokemon.id,
      image: pokemon.image,
      types: pokemon.types,
    };

    try {
      if (isFavorite) {
        await removeFavorite(user, pokemon.name);
        setIsFavorite(false);
      } else {
        await addFavorite(user, dataToSave);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("お気に入り処理に失敗しました", error);
    }
  }, [user, isFavorite, pokemon, setIsFavorite]);

  return (
    <motion.button
      onClick={handleFavorite}
      whileTap={{ scale: 1.1 }}
      animate={{ scale: isFavorite ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={`flex items-center gap-2 px-4 py-2 rounded font-semibold text-white ${
        isFavorite ? "bg-gray-400" : "bg-neutral-800"
      }`}
    >
      {isFavorite ? "お気に入り解除" : "お気に入りに追加"}
      <AnimatePresence mode="wait" initial={false}>
        {isFavorite ? (
          <motion.span
            key="outline"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <AiOutlineHeart size={20} />
          </motion.span>
        ) : (
          <motion.span
            key="filled"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <AiFillHeart size={20} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
