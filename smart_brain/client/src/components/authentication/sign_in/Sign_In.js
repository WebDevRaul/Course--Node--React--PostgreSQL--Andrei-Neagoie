import React, { Component } from 'react';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = { email, password };
    fetch('http://localhost:5678/sign-in', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      if(data === 'success') return this.props.onRouteChange('home');
    })
  }

  render() {
    const { onRouteChange } = this.props;
    return(
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <form className="measure" noValidate>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
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
                  onChange={this.onChange}
                  autoComplete='true' />
              </div>
              <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Sign in" />
            </div>
            <div className="lh-copy mt3">
              <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
              <p className="f6 link dim black db">Forgot your password?</p>
            </div>
          </form>
        </main>
      </article>
    )
  }
}

export default SignIn;