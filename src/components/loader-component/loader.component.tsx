import React from 'react';
import styles from './loader.module.scss';

const LoaderComponent = () => {
  return (
    <div className={styles.ring}>
      <div/>
      <div/>
      <div/>
      <div/>
    </div>
  );
};

export default LoaderComponent;
