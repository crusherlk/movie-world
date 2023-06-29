import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const TrendingPaginationButtons = (props) => {
  const { totalPages, setPage, goToTrending } = props;

  const handlePageChange = ({ selected }) => {
    setPage(selected + 1);
    goToTrending();
  };

  return (
    <div>
      <ReactPaginate
        containerClassName="flex items-center justify-center mt-8 mb-4 gap-2"
        pageClassName="pagination-list-item"
        activeClassName="pagination-list-item-active"
        disabledLinkClassName="pagination-list-item-disabled"
        breakLabel={<span>...</span>}
        previousLabel={
          <span className="w-10 h-10 flex items-center justify-center bg-tmdbLightGreen rounded-md hover:bg-tmdbLightBlue text-white">
            <BsChevronLeft />
          </span>
        }
        nextLabel={
          <span className="w-10 h-10 flex items-center justify-center bg-tmdbLightGreen rounded-md hover:bg-tmdbLightBlue text-white">
            <BsChevronRight />
          </span>
        }
        onPageChange={handlePageChange}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default TrendingPaginationButtons;
