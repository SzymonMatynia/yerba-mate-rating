import React from 'react';
import styles from './button.module.scss';

interface Props {
  text: string;
  onClick: () => void;
}

const ButtonComponent = ({text, onClick}: Props) => {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      <span className={styles.text}>{text}</span>
    </button>
  );
};

export default ButtonComponent;
