import React, {useEffect} from 'react';
import styles from './table.module.scss';
import LoaderComponent from '../loader-component/loader.component';

interface Props {
  children: React.ReactNode
  showLoader?: boolean
}

const TableComponent = (props: Props) => {
  useEffect(() => {
    console.log(props.children);
  });
  return (
    <div className={styles['table-component-wrapper']}>
      <table className={styles['table-component']}>
        {props.children}
      </table>
      {props.showLoader && <div className={styles['loader-container']}>
        <LoaderComponent/>
      </div>}
    </div>
  );
};

export default TableComponent;
