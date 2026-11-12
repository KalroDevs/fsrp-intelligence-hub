import React from 'react';
import HomePage from './pages/public/HomePage';

function App() {
  const [lang, setLang] = React.useState('en');

  return (
    <div className="App">
      <HomePage lang={lang} onLangChange={setLang} />
    </div>
  );
}

export default App;