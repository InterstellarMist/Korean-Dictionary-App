import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import { AnimatePresence } from 'motion/react';

import HomePage from './HomePage';
import WordPage from './WordPage';
import { useWordStore } from '../store/wordStore';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route index element={<HomePage />} />
        <Route path="word" element={<WordPage />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const init = useWordStore((state) => state.init);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default App;
