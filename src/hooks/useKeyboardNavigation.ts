import { useRef, useState } from 'react'

export function useKeyboardNavigation<T extends HTMLElement>(
  resultsLen: number,
  onSelect: (index: number) => void,
  unfocusSearch: () => void,
) {
  const [focusedIndex, setFocusedIndex] = useState(-1); // -1 is search, [0->N-1] result index
  const inputRef = useRef<(HTMLInputElement | null)>(null);
  const resultRefs = useRef<(T | null)[]>([]);

  // Focus UI element
  const focusIndex = (index: number) => {
    if (index === -1) {
      inputRef.current?.focus();
      return;
    }
    resultRefs.current[index]?.focus();
  }

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (resultsLen > 0) {
        setFocusedIndex(0);
        focusIndex(0);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      unfocusSearch();
    }
  }

  const handleResultKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.min(index + 1, resultsLen - 1);
      setFocusedIndex(next);
      focusIndex(next);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = index - 1;
      if (prev >= 0) {
        setFocusedIndex(prev);
        focusIndex(prev);
      } else {
        setFocusedIndex(-1);
        focusIndex(prev);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      onSelect(index);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      unfocusSearch();
    }
  }

  return {
    inputRef,
    resultRefs,
    handleResultKeyDown,
    handleInputKeyDown,
    focusedIndex,
  };
}