import React from 'react';

import { add, multiply } from '@kafelix496/js-library-template';

import './App.css';

function App() {
  return (
    <div className="App">
      {'add(1, 3) : ' + add(1, 3)}
      <div />
      {'multiply(2, 3) : ' + multiply(2, 3)}
    </div>
  );
}

export default App;
