import {
  useState,
  useCallback,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';

import { useWordStore } from '../../store/wordStore';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { useClickOutside } from '../../hooks/useClickOutside';
import { sanitizeInput } from '../../utils/inputValidation';

import searchIcon from '../../assets/search.svg';
import searchStyles from './Search.module.scss';

export interface SearchProps {
  setToggle?: Dispatch<SetStateAction<boolean>>;
  styles?: React.CSSProperties;
}

const Search = ({ setToggle, styles }: SearchProps) => {
  // React hooks
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  // Stores
  const search = useWordStore((state) => state.search);
  const setSearch = useWordStore((state) => state.setSearch);

  const results = useWordStore((state) => state.results);
  const clearResults = useWordStore((state) => state.clearResults);

  const getWord = useWordStore((state) => state.getWord);
  const searchWord = useWordStore((state) => state.searchWord);

  // Word selection flow
  const onSelect = (index: number) => {
    const result = results[index];
    if (result) {
      getWord(result.id)  // setWordState Store 
      setDropdown(false)
      clearResults();
      setSearch('');
      navigate('/word');
    }
  };

  // Custom keyboard navigation hook
  const unfocusSearch = () => {
    setDropdown(false);
    clearResults();
    setSearch('');
  };

  const {
    inputRef: inputRef,
    resultRefs: resultRefs,
    handleResultKeyDown,
    handleInputKeyDown,
  } = useKeyboardNavigation<HTMLDivElement>(results.length, onSelect, unfocusSearch);

  // Outside click custom hook
  const searchBarRef = useRef<HTMLDivElement>(null);

  useClickOutside(searchBarRef, unfocusSearch);

  // Input validation and data fetching
  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      // Input validation
      const sanitizedValue = sanitizeInput(value);
      setSearch(sanitizedValue);

      // toggle events
      if (sanitizedValue === '') {
        if (setToggle) setToggle(true);
        setDropdown(false);
        clearResults()
      } else {
        searchWord(sanitizedValue);
        if (setToggle) setToggle(false);
        setDropdown(true);
      }
    },
    [clearResults, searchWord, setSearch, setToggle]
  );

  return (
    <motion.div
      layoutId="search-bar"
      className={searchStyles.searchBar}
      ref={searchBarRef}
      style={{ ...styles, borderRadius: '50px' }}
      transition={{ duration: 0.25, type: 'spring', mass: 0.75, stiffness: 100 }}
    >
      <motion.div layout className={searchStyles.searchTop}>
        <img className={searchStyles.searchIcon} src={searchIcon} alt="search" />
        <input
          className={searchStyles.searchInput}
          type="text"
          ref={(el) => inputRef.current = el}
          value={search}
          onChange={handleChange}
          onKeyDown={(e) => handleInputKeyDown(e)}
          placeholder="Search"
          autoComplete="false"
          autoCorrect="off"
        />
      </motion.div>
      {
        dropdown && (
          <motion.div className={searchStyles.searchBottom}>
            {results.map((word, i) => {
              return (
                <div
                  className={searchStyles.result}
                  key={word.id}
                  ref={(el) => resultRefs.current[i] = el}
                  tabIndex={0}
                  role="menuitem"
                  onKeyDown={(e) => handleResultKeyDown(e, i)}
                  onClick={() => onSelect(i)}
                >
                  {word.word}
                </div>
              );
            })}
            {results.length === 0 && search && <p>no search result</p>}
          </motion.div>
        )
      }
    </motion.div >
  );
};

export default Search;
