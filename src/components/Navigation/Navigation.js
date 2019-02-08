import React from 'react';
import './Navigation.css';

const Navigation = ({onRouteChange,isSigned}) => {
    if(isSigned) {
        return(
            <nav className='btn' style={{display:'flex', justifyContent:'flex-end'}}>
                <p onClick={() => onRouteChange('signIn')} className='f3 link dim black b bgColor pa3 pointer'>Sign Out</p>
            </nav>
        );
    } else {
        return(
                <nav style={{display:'flex', justifyContent:'flex-end'}}>
                    <p onClick={() => onRouteChange('signIn')} className='f3 link dim black b bgColor pa3 pointer'>Sign In</p>
                    <p onClick={() => onRouteChange('register')} className='f3 link dim black b bgColor pa3 pointer'>Register</p>
                </nav>
        );
    }
}

export default Navigation;