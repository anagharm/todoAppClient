import React, { Component } from 'react';  
import { Route } from 'react-router-dom';  
import './AdminCss.css'
import AdminMenu from './AdminMenu';
import AdminHeader from './AdminHeader';

const AdminLayout = ({ children }) => {   
  var componentData = {children}
    return(
      <div className="adminLayoutInnerLayout">
        <div className="adminMenuOuterDiv">
          <AdminMenu />
        </div>
        <div className="adminContentOuterDiv">
          <AdminHeader  title={componentData.children.props.title}/>
          <div className="adminMainContentDiv">
            {children}
          </div>
        </div>
      </div>
    )  
};  
  
const AdminLayoutRoute = ({component: Component, ...rest}) => {  
  var parameter = {...rest}
return (  
  <Route {...rest} render={matchProps => (  
    <AdminLayout>  
        <Component {...matchProps} title = {parameter.title} />  
    </AdminLayout>  
  )} />  
)  
};  
  
export default AdminLayoutRoute;