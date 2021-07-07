import React, { Component } from 'react';  
import { Route } from 'react-router-dom';  
import AuthFooter from './AuthFooter';
import AuthHeader from './AuthHeader';
import './AuthCss.css'

const AuthLayout = ({ children }) => (                         
    <div className="container-fluid p-3 border">
      <AuthHeader />
      <div className="authSign">
        <div className="row">
          <div className="col-lg-6 authSignImgDiv">
          </div>
          <div className="col-lg-6 authSignFormDiv">
            {children}
          </div>
        </div>
      </div>
      <AuthFooter />
    </div>  
);  
  
const AuthLayoutRoute = ({component: Component, ...rest}) => {  
return (  
  <Route {...rest} render={matchProps => (  
    <AuthLayout>  
        <Component {...matchProps} />  
    </AuthLayout>  
  )} />  
)  
};  
  
export default AuthLayoutRoute;