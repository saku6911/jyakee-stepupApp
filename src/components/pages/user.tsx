import { useAtom } from "jotai";
import {
  pokeListAtom,
  fetchPagePokemonsAtom,
  totalCountAtom,
} from "../../atom";
import { useEffect } from "react";
import { Pagenation } from "../molecules/pagenation";

export default function User() {
  const [pokeList, setPokeList] = useAtom(pokeListAtom);
  const [, setTotalCount] = useAtom(totalCountAtom);
  const [fetchedData] = useAtom(fetchPagePokemonsAtom); // ✅ async atom を取得

  useEffect(() => {
    setPokeList(fetchedData.items);
    setTotalCount(fetchedData.total);
  }, [fetchedData, setPokeList, setTotalCount]);
  return (
    <div className="flex flex-col items-center justify-center h-full bg-red-900 p-20">
      <div className="bg-white grid grid-cols-5 gap-20 p-20">
        {pokeList.map((poke, index) => (
          <div key={index}>
            <img loading="lazy" src={poke.image} alt={poke.name} width={200} />
            <p>
              {poke.jaName} ({poke.name})
            </p>
            <p>タイプ: {poke.types.join(", ")}</p>
          </div>
        ))}
      </div>
      <Pagenation />
    </div>
  );
}
