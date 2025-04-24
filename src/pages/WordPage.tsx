import Search from '../components/Search/Search';
import WordCard from '../components/WordCard/WordCard';
import Logo from '../components/Logo/Logo';

const WordPage = () => {
  return (
    <>
      <div style={{
        position: 'relative', display: 'flex', width: '100%',
        height: '80px', margin: '50px 0 50px 50px', boxSizing: 'content-box'
      }}>
        <Logo styles={{ height: 80, top: '0%', position: 'relative' }} />
        <Search
          styles={{
            width: 'calc(100vw - 350px)',
            top: '0px',
            maxWidth: '1200px',
            minWidth: '350px',
            position: 'relative',
          }}
        />
      </div>
      <WordCard />
    </>
  );
};

export default WordPage;
