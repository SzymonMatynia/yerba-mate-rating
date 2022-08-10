import {TableComponent} from '../table-component/table.component';
import React, {useEffect, useState} from 'react';
import YerbaData from '../../types/yerba-data.interface';
import {YERBA_DATA} from '../../data/yerba';
import {InputComponent} from '../inputs/input-component/input.component';
import {ButtonComponent} from '../inputs/button-component/button.component';
import styles from './yerba-table-component.module.scss';

export const YerbaTableComponent = () => {

  const [newMate, setNewMate] = useState('');
  const [data, setData] = useState<YerbaData[]>([]);

  useEffect(() => {
    setData(YERBA_DATA);
  }, [])

  const onClickLike = (id: number) => {
    const mappedData = data.map(yerba => {
      if (yerba.id === id) {

        const newLikesQuantity = yerba.like ? yerba.likesQuantity - 1 : yerba.likesQuantity + 1;

        return {
          ...yerba,
          like: !yerba.like,
          likesQuantity: newLikesQuantity
        }
      }
      return yerba;
    })

    setData(mappedData);
  }

  const handleAddYerbamate = () => {
    if (newMate.length < 3) {
      return;
    }
    setData([
      ...data,
      {
        id: data.length + 1,
        name: newMate,
        like: false,
        likesQuantity: 0,
      }
    ]);
    setNewMate('');
  }

  return (
    <div>
      <div className={styles['add-form']}>
        <div className={styles.input}>
          <InputComponent placeholder={'type yerba name'} value={newMate} onChange={(val) => {
            setNewMate(val)
          }}/>
        </div>
        <div className={styles.button}>
          <ButtonComponent text={'Add yerba'} onClick={handleAddYerbamate}/>
        </div>

      </div>
      <TableComponent>
        <>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Like</th>
            <th>Likes quantity</th>
          </tr>
          </thead>

          <tbody>
          {
            data.map((yerba) => {
              return (
                <tr key={yerba.id}>
                  <td>{yerba.id}</td>
                  <td>{yerba.name}</td>
                  <td className={'clickable'} onClick={() => onClickLike(yerba.id)}>
                    <img style={{width: 20}} alt={'heart icon to like'}
                         src={yerba.like ? '/components/like-on.svg' : '/components/like-off.svg'}/>
                  </td>
                  <td>{yerba.likesQuantity}</td>
                </tr>
              )
            })
          }
          </tbody>

        </>
      </TableComponent>
    </div>

  )
}
