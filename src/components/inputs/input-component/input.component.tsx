import {ChangeEvent} from 'react';
import styles from './input.module.scss';

interface Props {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export const InputComponent = (props: Props) => {

  const handleOnChange = (ev: ChangeEvent<HTMLInputElement>) => {
    props.onChange(ev.target.value);
  }

  return (
    <input placeholder={props.placeholder} className={styles.input} value={props.value} onChange={handleOnChange}/>
  )
}
