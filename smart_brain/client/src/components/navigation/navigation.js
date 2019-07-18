import React from 'react';

const Navigation = ({ onRouteChange, isAuth }) => {
  if (isAuth) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }} >
        <p 
          onClick={() => onRouteChange('sign-in')}
          className='f3 link dim black underline pa3 pointer'
        >Sign Out</p>
      </nav>
    )
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }} >
        <p 
          onClick={() => onRouteChange('register')}
          className='f3 link dim black underline pa3 pointer'
        >Register</p>
        <p 
          onClick={() => onRouteChange('sign-in')}
          className='f3 link dim black underline pa3 pointer'
        >Sign In</p>
      </nav>
    )
  }
}

export default Navigation;