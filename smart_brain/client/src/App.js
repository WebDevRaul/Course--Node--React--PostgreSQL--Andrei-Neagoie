import React from 'react';

// Css
import './App.css';
import 'tachyons';

// Components
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/image_link_form/Image_Link_Form';


function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <ImageLinkForm />
    </div>
  );
}

export default App;
