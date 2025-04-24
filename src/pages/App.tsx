import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from './HomePage';
import WordPage from './WordPage';
import { useWordStore } from '../store/wordStore';
import { useEffect } from 'react';

const App = () => {
  const init = useWordStore((state) => state.init);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="word" element={<WordPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
