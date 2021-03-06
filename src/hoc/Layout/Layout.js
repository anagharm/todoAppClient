import React, { Component } from 'react';  
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';  
  
/** Layouts **/  
import SignUpInLayoutRoute from './AuthLayout/AuthLayout'
import AdminLayoutRoute from './AdminLayout/AdminLayout'
/** Components **/   
import SignIn from '../../Components/Auth/SignIn';
import SignUp from '../../Components/Auth/SignUp';
import ForgotPassword from '../../Components/Auth/ForgotPassword';
import VerifyOTP from '../../Components/Auth/VerifyOTP';
import RegisterUser from '../../Components/Users/RegisterUser';
import ListUser from '../../Components/Users/ListUser';
import ViewUser from '../../Components/Users/ViewUser';
import ToDoTask from '../../Components/ToDoTask/ToDoTask';
import Status from '../../Components/Status/Status';
import UserLayoutRoute from './UserLayout/UserLayout';
import CommingSoon from '../../Components/CommingSoon/CommingSoon';
import SchoolWork from '../../Components/SchoolWork/SchoolWork';
import Subject from '../../Components/Subject/Subject';
import TypeOfAssignment from '../../Components/TypeOfAssignment/TypeOfAssignment';
import SchoolWorkView from '../../Components/SchoolWork/SchoolWorkView';

class LayoutCall extends Component {  
  render() {  
    return (  
      <Router>  
        <Switch>  
          <Route exact path="/">  
            <Redirect to="/signin" />  
          </Route>  
          <SignUpInLayoutRoute path="/signin" component={SignIn} />  
          <SignUpInLayoutRoute path="/signup" component={SignUp} />  
          <SignUpInLayoutRoute path="/forgotpassword" component={ForgotPassword} />  
          <SignUpInLayoutRoute path="/verifyopt" component={VerifyOTP} />  
          <AdminLayoutRoute path="/admin/user/register" title="Register New User" component={RegisterUser} />
          <AdminLayoutRoute path="/admin/user/list" title="List of Registered User" component={ListUser} />
          <AdminLayoutRoute path="/admin/user/view/:usercode" title="User Details" component={ViewUser} />
          <AdminLayoutRoute path="/admin/user/edit/:usercode" title="Edit User Details" component={RegisterUser} />
          <AdminLayoutRoute path="/admin/user/add" title="Create New User" component={RegisterUser} />
          <AdminLayoutRoute path="/admin/task" title="List of Tasks" component={ToDoTask} />
          <AdminLayoutRoute path="/admin/status" title="List of Status of Task" component={Status} />
          <AdminLayoutRoute path="/admin/subject" title="List of Subject" component={Subject} />
          <AdminLayoutRoute path="/admin/typeofassignment" title="List of Type of Assignment" component={TypeOfAssignment} />

          <UserLayoutRoute path="/user/task" title="My Tasks" component={ToDoTask} />
          <UserLayoutRoute path="/user/schoolwork" title="Add School Work" component={SchoolWork} />
          <UserLayoutRoute path="/user/schoolworkview" title="My School Work" component={SchoolWorkView} />
        </Switch>  
      </Router>  
    );  
  }  
}  
  
export default LayoutCall;