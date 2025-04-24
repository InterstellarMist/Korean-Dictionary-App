import clsx from 'clsx';
import TextBox from '../TextBox/TextBox';

import { useWordStore } from '../../store/wordStore';
import useIsWide from '../../hooks/useIsWide';

import styles from './WordCard.module.scss';

const WordCard = () => {
  // Zustand Store
  const currentWord = useWordStore((state) => state.currentWord);

  // Media query custom hook
  const isWide = useIsWide('(min-width: 1400px)');

  return (
    <div
      className="container flex-center"
      style={{ height: 'calc(100% - 180px)' }}
    >
      <div className={styles.mainCard}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>
            <div>
              <span className={styles.title}>{`${currentWord?.word.korean} ${currentWord?.word.english}`}</span>
              [{currentWord?.type}]
            </div>
            <div className={styles.notesButton}>Notes</div>
          </div>
        </div>
        <div className={clsx(styles.cardBody, isWide ? styles.cardBodyWide : '')} >
          <div className={styles.textBoxContainer}>
            <h1>Examples</h1>
            <TextBox data={currentWord?.examples} />
          </div>
          <div className={styles.textBoxContainer}>
            <h1>Common Usages</h1>
            <TextBox data={currentWord?.commonUsages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCard;
