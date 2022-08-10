import React from 'react';
import styles from './table.module.scss'

interface Props {
  children: React.ReactNode
}

export const TableComponent = (props: Props) => {
  return (
    <table className={styles['table-component']}>
      {props.children}
    </table>
  )
}
