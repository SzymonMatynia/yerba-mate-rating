import React, {useEffect, useState} from 'react';
import TableComponent from '../table-component/table.component';
import InputComponent from '../inputs/input-component/input.component';
import ButtonComponent from '../inputs/button-component/button.component';
import styles from './yerba-table-component.module.scss';
import firestore from '../../firebase/firebase';
import {collection, addDoc, getDocs, query} from '@firebase/firestore';

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
          // TODO: notification + stop loader
        });
  }, []);

  // TODO: it will be implemented on firebase side
  const onClickLike = (id: number) => {
    const mappedData = data.map((yerba) => {
      if (yerba.id === id) {
        const newLikesQuantity = yerba.like ?
          yerba.likesQuantity - 1 :
          yerba.likesQuantity + 1;

        return {
          ...yerba,
          like: !yerba.like,
          likesQuantity: newLikesQuantity,
        };
      }
      return yerba;
    });

    setData(mappedData);
  };

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

  return (
    <div>
      <div className={styles['add-form']}>
        <div className={styles.input}>
          <InputComponent
            placeholder="type yerba name"
            value={newMate}
            onChange={(val) => {
              setNewMate(val);
            }}
          />
        </div>
        <div className={styles.button}>
          <ButtonComponent
            text="Add yerba"
            onClick={handleAddYerbamate} />
        </div>

      </div>
      <TableComponent showLoader={tableLoader}>
        <>
          <thead>
            <tr>
              <th>Name</th>
              <th>Like</th>
              <th>Likes quantity</th>
            </tr>
          </thead>

          <tbody>
            {
              data.map((yerba) => (
                <tr key={yerba.id}>
                  <td>{yerba.name}</td>
                  <td
                    className="clickable"
                    onClick={
                      () => onClickLike(yerba.id)
                    }>
                    <img
                      style={{width: 20}}
                      alt="heart icon to like"
                      src={yerba.like ?
                        '/components/like-on.svg' :
                        '/components/like-off.svg'}
                    />
                  </td>
                  <td>{yerba.likesQuantity}</td>
                </tr>
              ))
            }
          </tbody>

        </>
      </TableComponent>
    </div>

  );
};

export default YerbaTableComponent;
