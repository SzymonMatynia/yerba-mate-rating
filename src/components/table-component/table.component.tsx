import React, {useEffect, useState} from 'react';
import styles from './table.module.scss';
import LoaderComponent from '../loader-component/loader.component';
import cx from 'classnames';

export interface TableRow {
  id: string | number;
  cells: CellData[];
}

export interface CellData {
  id: string | number;
  content: string[] | number[] | React.ReactNode[];
}

export interface Table {
  headers: string[],
  rows: TableRow[]
}

interface Props {
  showLoader?: boolean
  table: Table
}

interface Sorting {
  header: string,
  state: SortingState;
}

type SortingState = 'off' | 'asc' | 'desc';

const TableComponent = ({showLoader, table}: Props) => {
  const [sortings, setSortings] = useState<Sorting[]>([]);

  useEffect(() => {
    setSortings(table.headers.map((header) => {
      return {
        header: header,
        state: 'off',
      };
    }));
  }, []);

  useEffect(() => {
    console.log(sortings);
  }, [sortings]);

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

  const getHeaderState = (header: string): SortingState|undefined => {
    return sortings.find((el) => el.header === header)?.state;
  };

  const getNewSortingState = (state: SortingState): SortingState => {
    switch (state) {
      case 'off':
        return 'asc';
      case 'asc':
        return 'desc';
      case 'desc':
        return 'off';
      default:
        return 'off';
    }
  };

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
        <tbody>
          {
            table.rows.map((row) => (
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
      </table>
      {showLoader && <div className={styles['loader-container']}>
        <LoaderComponent/>
      </div>}
    </div>
  );
};

export default TableComponent;
