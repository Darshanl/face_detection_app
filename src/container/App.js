import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from '../components/Navigation/Navigation';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Registration from '../components/Registration/Registration';
import SignIn from '../components/SignIn/SignIn';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'dcf2d39f5ec842bd869bd914f7bcc764'
});

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input:'',
  imageUrl:'',
  box:{},
  route:'signIn',
  isSigned:false,
  user:{
    id:'',
    name:'',
    email:'',
    password:'',
    entries:0,
    joined: ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState
  }

  onloadUser = (data) => {
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      password:data.password,
      entries:data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow:clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box:box});
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }

  onRouteChange = (route) => {
    if(route === 'home'){
      this.setState({isSigned:true})
    } else {
      this.setState(initialState)
    }
    this.setState({route:route})
  }

  onSubmit = () => {
    this.setState({imageUrl:this.state.input})
      app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if(response){
          fetch('http://localhost:3001/image', {
            method:'put',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              id:this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries:count}))
          })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err))
  }

  render() {
    return(
      <div className='App'>
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSigned={this.state.isSigned} onRouteChange = {this.onRouteChange} route={this.state.route}/>
        {this.state.route === 'home' ?
          <div>
            <Logo />
            <Rank 
              name = {this.state.user.name} 
              entries={this.state.user.entries}
            />
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
          :
          (this.state.route === 'signIn' ? 
            <SignIn onloadUser={this.onloadUser} onRouteChange = {this.onRouteChange}/>
            :<Registration onloadUser={this.onloadUser} onRouteChange = {this.onRouteChange} />
          )
        }
      </div>
    )
  }
}

export default App;
