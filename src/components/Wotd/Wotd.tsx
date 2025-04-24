import { useMemo, useState } from 'react';
import { useTransition, animated } from '@react-spring/web';
import debounce from 'lodash.debounce';
import chevronUp from '../../assets/chevronUp.svg';
import styles from './Wotd.module.scss';

const Wotd = () => {
  const [toggle, setToggle] = useState(false);

  const transitions = useTransition(toggle, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(20px)' },
  });

  const handleClick = useMemo(() => debounce(
    () => setToggle((prev) => !prev), 300
  ), []);

  return (
    <div className={styles.wotdCard} onClick={handleClick}>
      <img className={styles.chevronUp} src={chevronUp} alt="up" />
      {transitions((style, item) => (item &&
        <animated.div className={styles.dailyWord} style={style}>
          Word of the day
          <div>도시 = city</div>
        </animated.div>
      ))}
    </div>
  );
};

export default Wotd;
