import React, { useState } from 'react'
import './UserCss.css'
import { useHistory } from "react-router-dom";
import profileImg from '../../../assets/img/profileImg.png'
import Dropdown from 'react-bootstrap/Dropdown'

function UserHeader(props) {

    const history = useHistory();
    const [userImg, setUserImg] = useState(profileImg)
    function logout() {
        localStorage.setItem("userCode", "")
        history.push('/');
    }
    return (
        <div className="userHeaderOuterDiv">
            <div className="float-start"><h4>{props.title}</h4></div>
            <div className="userHeaderName float-end">
                <Dropdown className="d-inline mx-2">
                    <Dropdown.Toggle id="dropdown-autoclose-true">
                       <img src={userImg} width="30" height="30" /> {localStorage.getItem("firstName")}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="/user/task">Task</Dropdown.Item>
                        <Dropdown.Item href="/user/schoolworkview">School Work</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={() => logout()} >Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}

export default UserHeader
