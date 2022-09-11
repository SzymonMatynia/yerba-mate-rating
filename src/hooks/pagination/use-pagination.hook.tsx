import React, {useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import styles from './use-pagination-hook.module.scss';

interface Props {
  limit: number;
  totalItems: number;
}

interface UsePagination {
  limit: number;
  offset: number;
  pagination: React.ReactNode;
}

const usePagination = (props: Props): UsePagination => {
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setPageCount(Math.ceil(props.totalItems / props.limit));
  }, [offset, props.limit, props.totalItems]);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setOffset((selectedItem.selected * props.limit) % props.totalItems);
  };

  const pagination = (
    <ReactPaginate
      breakLabel='...'
      previousLabel={'<'}
      nextLabel={'>'}
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      containerClassName={styles.pagination}
      pageLinkClassName={styles['pagination__page']}
      activeLinkClassName={styles['pagination__active']}
      breakClassName={styles['pagination__break']}
    />
  );

  return {limit: props.limit, offset: offset, pagination};
};

export default usePagination;
