import React from 'react'
import './AdminCss.css'
import { useHistory } from "react-router-dom";

function AdminHeader(props) {
    const history = useHistory();

    function logout(){
        alert("logout")
        localStorage.setItem("userCode","")
        history.push('/');
    }

    return (
        <div className="adminHeaderOuterDiv">
            <div className="float-start"><h4>{props.title}</h4></div>
            <div className="float-end">
                
                <div className="userHeaderLogout" onClick={() => logout()}>Logout</div>
            </div>
        </div>
    )
}

export default AdminHeader
