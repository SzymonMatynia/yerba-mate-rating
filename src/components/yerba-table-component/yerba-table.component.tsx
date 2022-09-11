import React, {useEffect, useState} from 'react';
import TableComponent
  from '../table-component/table.component';
import InputComponent from '../inputs/input-component/input.component';
import ButtonComponent from '../inputs/button-component/button.component';
import styles from './yerba-table-component.module.scss';
import firestore from '../../firebase/firebase';
import {collection, addDoc, getDocs, query} from '@firebase/firestore';
import {Table, TableRow} from '../table-component/types/table.types';

const YERBA_TABLE_HEADERS = ['Name', 'Quantity'];

const YerbaTableComponent = () => {
  const [newMate, setNewMate] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [tableLoader, setTableLoader] = useState<boolean>(true);

  const yerbaRef = collection(firestore, 'yerba');

  const loadYerbas = async () => {
    const data = await getDocs(query(yerbaRef));

    if (data.docs.length < 1) {
      return;
    }

    const mapped = data.docs.map((yerba) => {
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
          // TODO: notification
        });
  }, []);

  const handleAddYerbamate = async () => {
    if (newMate.length < 3) {
      // TODO: send notification
      return;
    }
    setTableLoader(true);
    await addDoc(yerbaRef, {name: newMate});
    await loadYerbas();
    setNewMate('');
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
        table={getMappedTableData()}
        showLoader={tableLoader}/>
    </div>

  );
};

export default YerbaTableComponent;
