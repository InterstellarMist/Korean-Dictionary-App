import { WordPair } from '../../types/wordTypes';
import styles from './TextBox.module.scss';

export interface TextBoxProps {
  data?: WordPair[];
}

const TextBox = ({ data }: TextBoxProps) => {
  return (
    <div className={styles.box}>
      <div>
        {data && data.map((entry, index) => {
          return <p key={index}> {`${entry.korean} = ${entry.english}`}</p>;
        })}
      </div>
    </div>
  );
};

export default TextBox;
