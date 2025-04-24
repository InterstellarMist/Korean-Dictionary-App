import { useState } from 'react';
import Search from '../components/Search/Search';
import Wotd from '../components/Wotd/Wotd';
import Logo from '../components/Logo/Logo';

const Home = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <div className="container flex-column">
      <div
        className="container flex-column"
        style={{ width: 500, height: 500, position: 'relative' }}
      >
        <Logo styles={{ width: 500, top: '20%', position: 'absolute' }} />
        <Search setToggle={setToggle} styles={{
          top: '60%',
          maxWidth: '800px',
          minWidth: '500px',
          position: 'absolute',
          width: 'calc(100vw - 200px)',
        }} />
        {toggle && <Wotd />}
      </div>
    </div>
  );
};

export default Home;
