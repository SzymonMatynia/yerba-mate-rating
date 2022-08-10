import styles from './button.module.scss';

interface Props {
  text: string;
  onClick: () => void;
}

export const ButtonComponent = (props: Props) => {


  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.text}
    </button>
  )
}
