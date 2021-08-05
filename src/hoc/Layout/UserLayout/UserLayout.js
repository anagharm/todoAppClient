import React, { Component } from 'react';  
import { Route } from 'react-router-dom';  
import './UserCss.css'
import UserHeader from './UserHeader';

const UserLayout = ({ children }) => {   
  var componentData = {children}
    return(
      <div className="userLayoutInnerLayout">
        <div className="userContentOuterDiv">
          <UserHeader  title={componentData.children.props.title}/>
          <div className="userMainContentDiv">
            {children}
          </div>
        </div>
      </div>
    )  
};  
  
const UserLayoutRoute = ({component: Component, ...rest}) => {  
  var parameter = {...rest}

return (  
  <Route {...rest} render={matchProps => (  
    <UserLayout>  
        <Component {...matchProps} title = {parameter.title} />  
    </UserLayout>  
  )} />  
)  
};  
  
export default UserLayoutRoute;