import React, { Component } from 'react'

// Css
import './App.css';
import 'tachyons';

// Particles
import Particles from 'react-particles-js';

// Components
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/image_link_form/Image_Link_Form';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/face_recognition/Face_recognition';

// Clarifai
import Clarifai from 'clarifai';
import api_key from './config/key';

const particlesOptions = {
  particles: {
    number: {
      value: 20,
      density: {
        enable: true,
        value_area: 300
      }
    }
  }
}

const app = new Clarifai.App({
  apiKey: api_key.clarifai_key
 });

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {}
    }
  }
  calculateFaceLocation = data => {
    const image = document.querySelector('#input-image');
    const width = Number(image.width);
    const height = Number(image.height);
    const box = {
      left_col: data.left_col * width,
      top_row: data.top_row * height,
      right_col: width - (data.right_col * width),
      bottom_row: height - (data.bottom_row * height),
    }

    console.log(box);

    this.setState({ box })
  }

  onChange = e => {
    this.setState({ input: e.target.value })
  }
  onSubmit = e => {
    e.preventDefault();

    this.setState({ imageURL: this.state.input });

    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input
    )
    .then(res => {
      const data = res['outputs'][0]['data']['regions'][0]['region_info']['bounding_box'];
      this.calculateFaceLocation(data);
    })
    .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onChange={this.onChange} onSubmit={this.onSubmit} />
        <FaceRecognition imageURL={this.state.imageURL} box={this.state.box} />
      </div>
    );
  }
}

export default App;
