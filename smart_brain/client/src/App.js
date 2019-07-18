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
import SignIn from './components/authentication/sign_in/Sign_In';
import Register from './components/authentication/register/register';

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
      box: {},
      route: 'sign-in',
      isAuth: false
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

  onRouteChange = route => {
    if (route === 'home') {
      this.setState({ isAuth: true })
    } else if(route === 'sign-in' || route === 'register') {
      this.setState({ isAuth: false })
    }
    this.setState({ route })
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} isAuth={this.state.isAuth} />
        { 
          this.state.route === 'home' 
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onChange={this.onChange} onSubmit={this.onSubmit} />
              <FaceRecognition imageURL={this.state.imageURL} box={this.state.box} />
            </div>
          : (
            this.state.route === 'sign-in' 
            ? <SignIn onRouteChange={this.onRouteChange}/> 
            : <Register onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;
