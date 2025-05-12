import { useAtom } from "jotai";
import { currentPageAtom, itemsPerPageAtom, totalCountAtom } from "../../atom";

export function Pagenation() {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [itemsPerPage] = useAtom(itemsPerPageAtom);
  const [totalCount] = useAtom(totalCountAtom);
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const pageGroupSize = 10;

  const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
  const groupStart = currentGroup * pageGroupSize + 1;
  const groupEnd = Math.min(groupStart + pageGroupSize - 1, totalPages);

  const pageNumbers = [];
  for (let i = groupStart; i <= groupEnd; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex gap-2 mt-10 flex-wrap justify-center">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="bg-white hover:opacity-70 text-gray-900 font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed ml-4"
      >
        ← 前へ
      </button>

      {currentGroup > 0 && (
        <button
          onClick={() => setCurrentPage(groupStart - pageGroupSize)}
          className="px-4 py-2 bg-white text-gray-900 rounded"
        >
          ...
        </button>
      )}

      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => setCurrentPage(num)}
          className={`px-4 py-2 rounded ${
            currentPage === num
              ? "bg-red-500 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          {num}
        </button>
      ))}

      {groupEnd < totalPages && (
        <button
          onClick={() => setCurrentPage(groupEnd + 1)}
          className="px-4 py-2 bg-white text-gray-900 rounded"
        >
          ...
        </button>
      )}

      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="bg-white hover:opacity-70 text-gray-900 font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed ml-4"
      >
        次へ →
      </button>
    </div>
  );
}
