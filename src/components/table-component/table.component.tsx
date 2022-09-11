import React, {useEffect, useState} from 'react';
import styles from './table.module.scss';
import LoaderComponent from '../loader-component/loader.component';
import cx from 'classnames';
import {
  Sorting,
  TableRow,
  Table,
  SortingState} from './types/table.types';
import {
  TABLE_SORT_ASC,
  TABLE_SORT_DESC,
  TABLE_SORT_OFF} from './const/table.const';
import usePagination from '../../hooks/pagination/use-pagination.hook';

interface Props {
  showLoader?: boolean
  table: Table
}

const TableComponent = ({showLoader, table}: Props) => {
  const [sortings, setSortings] = useState<Sorting[]>([]);
  const [sortedRows, setSortedRows] = useState<TableRow[]>([]);

  useEffect(() => {
    setSortings(table.headers.map((header) => {
      return {
        header: header,
        state: TABLE_SORT_OFF,
      };
    }));
  }, []);

  const handleSort = (header: string) => {
    const mappedSortings = sortings.map((sorting) => {
      return {
        header: sorting.header,
        state: sorting.header === header ?
          getNewSortingState(sorting.state) :
          sorting.state,
      };
    });

    setSortings(mappedSortings);
  };

  useEffect(() => {
    if (isAnyHeaderSorted()) {
      const sorted = [...table.rows].sort(sortByHeader);
      setSortedRows(sorted);
      return;
    }
    setSortedRows([]);
  }, [sortings, table.rows]);

  const sortByHeader = (a: TableRow, b: TableRow) => {
    let aPoints = 0;
    let bPoints = 0;

    const aCells = a.cells;
    const bCells = b.cells;

    const aCellsLength = aCells.length;
    // const bCellsLength = bCells.length;

    for (let i = 0; i < aCellsLength; i++) {
      const sorting = getSortingByIndex(i);
      const aCellContent = aCells[i]?.content;
      const bCellContent = bCells[i]?.content;

      if (sorting.state === TABLE_SORT_OFF) {
        continue;
      }

      // TODO: refactor these ts-ignores
      // @ts-ignore
      if (aCellContent > bCellContent) {
        sorting.state === TABLE_SORT_DESC ? aPoints++ : bPoints++;
      // @ts-ignore
      } else if (aCellContent < bCellContent) {
        sorting.state === TABLE_SORT_DESC ? bPoints++ : aPoints++;
      }
    }

    if (aPoints > bPoints) {
      return -1;
    } else if (aPoints < bPoints) {
      return 1;
    }
    return 0;
  };

  const getHeaderState = (header: string): SortingState|undefined => {
    return sortings.find((el) => el.header === header)?.state;
  };

  const getSortingByIndex = (index: number): Sorting => {
    return sortings[index];
  };

  const isAnyHeaderSorted = (): boolean => {
    return !!sortings.find((el) => el.state !== TABLE_SORT_OFF);
  };

  const getNewSortingState = (state: SortingState): SortingState => {
    switch (state) {
      case TABLE_SORT_OFF:
        return TABLE_SORT_ASC;
      case TABLE_SORT_ASC:
        return TABLE_SORT_DESC;
      case TABLE_SORT_DESC:
        return TABLE_SORT_OFF;
      default:
        return TABLE_SORT_OFF;
    }
  };

  const renderTableBody = (rows: TableRow[]) => {
    return (
      <tbody>
        {
          rows.map((row) => (
            <tr key={row.id}>
              {
                row.cells.map((cell) => {
                  return (
                    <td key={cell.id}>{cell.content}</td>
                  );
                })
              }
            </tr>
          ))
        }
      </tbody>

    );
  };


  const {limit, pagination, offset} = usePagination({
    limit: 10,
    totalItems: 99,
  });

  return (
    <div className={styles['table-component-wrapper']}>
      <table className={styles['table-component']}>
        <thead>
          <tr>
            {
              table.headers.map((header) => {
                return (
                  <th
                    onClick={() => {
                      handleSort(header);
                    }}
                    className={cx(
                        styles.sortable,
                        styles[`sortable--${getHeaderState(header)}`],
                    )}
                    key={header}>
                    <div className={styles.content}>{header}</div>
                  </th>
                );
              })
            }
          </tr>
        </thead>
        {renderTableBody(sortedRows.length > 0 ? sortedRows : table.rows)}
      </table>
      {showLoader && <div className={styles['loader-container']}>
        <LoaderComponent/>
      </div>}

      {limit}
      {offset}
      {pagination}
    </div>
  );
};

export default TableComponent;
