import React, { Component } from 'react';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit = e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const user = { name, email, password };
    fetch('http://localhost:5678/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(user => {
      if(user){
        this.props.updateUser(user)
        this.props.onRouteChange('sign-in')
      }
    })
    .catch(err => console.log(err))
  }

  render() {
    return(
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <form className="measure" noValidate>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="text" 
                  name="name"  
                  id="name" 
                  onChange={this.onChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email"  
                  id="email-address" 
                  onChange={this.onChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" 
                  name="password"  
                  id="password" 
                  autoComplete='true' 
                  onChange={this.onChange}
                />
              </div>
              <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmit} 
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Register" 
                />
            </div>
            <div className="lh-copy mt3">
              <a href="#0" className="f6 link dim black db">Forgot your password?</a>
            </div>
          </form>
        </main>
      </article>
    )
  }
}

export default Register;