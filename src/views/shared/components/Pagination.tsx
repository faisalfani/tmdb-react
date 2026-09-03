type Props = {
  currentPage: number;
  totalData: number;
  onPageChange: (page: number) => void;
  pageLimit?: number;
};

export const PAGE_LIMIT = 20;

const VISIBLE_PAGE = 5;

export const Pagination = ({
  currentPage,
  totalData,
  onPageChange,
  pageLimit = PAGE_LIMIT,
}: Props) => {
  const totalPage = Math.ceil(totalData / pageLimit);

  if (totalPage <= 1) return null;

  const startPage = Math.max(1, currentPage - Math.floor(VISIBLE_PAGE / 2));

  const listPages = Array.from({ length: VISIBLE_PAGE }, (_, i) => {
    const page = startPage + i;
    return page <= totalPage ? page : null;
  }).filter((page): page is number => page !== null);

  const onPrevPage = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const onNextPage = () => {
    if (currentPage < totalPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="w-full justify-center flex pt-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={onPrevPage}
          className="px-3.5 py-2 text-sm font-medium rounded-lg cursor-pointer bg-neutral-800 border border-neutral-700/80 text-neutral-200 hover:bg-neutral-700/80 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Prev
        </button>

        {listPages.map((page) => (
          <button
            key={page}
            type="button"
            disabled={currentPage === page}
            onClick={() => onPageChange(page)}
            className={`px-3.5 py-2 text-sm font-medium rounded-lg cursor-pointer transition ${
              currentPage === page
                ? 'bg-red-600 text-white font-bold border border-red-500 shadow-md'
                : 'bg-neutral-800 border border-neutral-700/80 text-neutral-300 hover:bg-neutral-700/80 hover:text-white'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          disabled={currentPage === totalPage}
          onClick={onNextPage}
          className="px-3.5 py-2 text-sm font-medium rounded-lg cursor-pointer bg-neutral-800 border border-neutral-700/80 text-neutral-200 hover:bg-neutral-700/80 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
