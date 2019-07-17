import React from 'react';

// Css
import './App.css';
import 'tachyons';

// Components
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/Logo';


function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
    </div>
  );
}

export default App;
