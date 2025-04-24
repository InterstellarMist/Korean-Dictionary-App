import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import debounce from 'lodash.debounce';
import chevronUp from '../../assets/chevronUp.svg';
import styles from './Wotd.module.scss';

const Wotd = () => {
  const [toggle, setToggle] = useState(false);

  const handleClick = useMemo(() => debounce(
    () => setToggle((prev) => !prev), 100
  ), []);

  return (
    <div className={styles.wotdCard} onClick={handleClick}>
      <AnimatePresence>
        {toggle && <motion.div
          className={styles.dailyWord}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.200 }}
        >
          Word of the day
          <div>도시 = city</div>
        </motion.div>
        }
      </AnimatePresence>
      <img className={styles.chevronUp} src={chevronUp} alt="up" />
    </div>
  );
};

export default Wotd;
