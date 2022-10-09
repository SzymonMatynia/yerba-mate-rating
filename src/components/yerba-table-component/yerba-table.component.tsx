import React, {useEffect, useState} from 'react';
import TableComponent
  from '../table-component/table.component';
import InputComponent from '../inputs/input-component/input.component';
import ButtonComponent from '../inputs/button-component/button.component';
import styles from './yerba-table-component.module.scss';
import firestore from '../../firebase/firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  startAt,
  limit,
  orderBy,
} from '@firebase/firestore';
import {Table, TableRow} from '../table-component/types/table.types';
import notifier from '../../plugins/awesome-notifications.plugin';

const YERBA_TABLE_HEADERS = ['Name', 'Quantity'];
const LIMIT_PER_PAGE = 2;

const YerbaTableComponent = () => {
  const [newMate, setNewMate] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [tableLoader, setTableLoader] = useState<boolean>(true);

  const yerbaRef = collection(firestore, 'yerba');

  const loadYerbas = async (
      limitNum: number = LIMIT_PER_PAGE,
      offset: number = 0,
  ) => {
    const data = await getDocs(query(
        yerbaRef,
        orderBy('name'),
        limit(limitNum),
        startAt(offset),
    ));

    const allItems = await getDocs(query(yerbaRef));

    setTotalItems(allItems.size);

    if (data.docs.length < 1) {
      return;
    }

    const mapped = data.docs.map((yerba) => {
      console.log(yerba.data());
      return {
        id: yerba.id,
        ...yerba.data(),
      };
    });

    setData(mapped);
  };

  useEffect(() => {
    setTableLoader(true);
    loadYerbas()
        .then(() => {
          setTableLoader(false);
        }).catch((err) => {
          setTableLoader(false);
          notifier.alert(err.message);
        });
  }, []);

  const handleAddYerbamate = async () => {
    if (newMate.length < 3) {
      notifier.alert('name must be at least 3 letters.');
      return;
    }
    setTableLoader(true);
    try {
      await addDoc(yerbaRef, {name: newMate});
      await loadYerbas();
      setNewMate('');
    } catch (err: any) {
      notifier.alert(err.message);
    }
    setTableLoader(false);
  };

  const getMappedTableData = (): Table => {
    const mappedRows = data.map((val, index): TableRow => {
      return {
        cells: [
          {
            id: val.id,
            content: val.name,
          },
        ],
        id: val.id,
      };
    });

    return {
      headers: YERBA_TABLE_HEADERS,
      rows: mappedRows,
    };
  };

  return (
    <div>
      <div className={styles['add-form']}>
        <div className={styles.input}>
          <InputComponent
            placeholder="add new yerba mate"
            value={newMate}
            onChange={(val) => {
              setNewMate(val);
            }}
          />
        </div>
        <div className={styles.button}>
          <ButtonComponent
            text="Add"
            onClick={handleAddYerbamate} />
        </div>

      </div>
      <TableComponent
        onPageChange={(offset: number) => {
          console.log(offset);
          loadYerbas(LIMIT_PER_PAGE, offset);
        }}
        totalItems={totalItems}
        perPageLimit={LIMIT_PER_PAGE}
        table={getMappedTableData()}
        showLoader={tableLoader}/>
    </div>

  );
};

export default YerbaTableComponent;
