import React, {useState} from 'react';
import TableComponent
  from '../table-component/table.component';
import InputComponent from '../inputs/input-component/input.component';
import ButtonComponent from '../inputs/button-component/button.component';
import styles from './yerba-table-component.module.scss';
import {Table, TableRow} from '../table-component/types/table.types';
import YerbaDataInterface from '../../types/yerba-data.interface';
import YERBA_TABLE_HEADERS from './const/yerba-table-headers.const';
import yerbaData from '../../data/yerba-data';

const YerbaTableComponent = () => {
  const [nameInput, setNameInput] = useState<string>('');
  const [priceInput, setPriceInput] = useState<string>('');
  const [data, setData] = useState<YerbaDataInterface[]>(yerbaData);
  const [tableLoader, setTableLoader] = useState<boolean>(false);

  const handleAddData = async () => {
    if (nameInput.length < 3) {
      // TODO: send notification
      return;
    }

    if (!priceInput || !/^\d+(\.\d{1,2})?$/.test(priceInput)) {
      return;
    }

    const newYerbaObject: YerbaDataInterface = {
      id: data.length + 1,
      name: nameInput,
      price: Number(priceInput),
    };

    setTableLoader(true);
    setData([...data, newYerbaObject]);
    setTableLoader(false);
    setNameInput('');
    setPriceInput('');
  };

  const getMappedTableData = (): Table => {
    const mappedRows = data.map((val): TableRow => {
      return {
        cells: [
          {
            content: val.name,
          },
          {
            content: val.price,
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
        <div className={styles['input-group']}>
          <div className={styles.input}>
            <InputComponent
              label={'Yerbamate name'}
              type={'text'}
              placeholder="Yerbamate name"
              value={nameInput}
              onChange={(val) => {
                setNameInput(val);
              }}
            />
          </div>
          <div className={styles.input}>
            <InputComponent
              label={'Yerbamate price/kg'}
              type={'text'}
              placeholder="E.g. 10.99"
              value={priceInput.toString()}
              onChange={(val) => {
                setPriceInput(val.replace(/[^\d.]/g, ''));
              }}
            />
          </div>
        </div>
        <div className={styles.button}>
          <ButtonComponent
            text="Add"
            onClick={handleAddData} />
        </div>

      </div>
      <TableComponent
        table={getMappedTableData()}
        showLoader={tableLoader}/>
    </div>

  );
};

export default YerbaTableComponent;
