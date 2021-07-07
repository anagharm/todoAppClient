import React from 'react'
import './AdminCss.css'
function AdminHeader(props) {
    return (
        <div className="adminHeaderOuterDiv">
            <h4>{props.title}</h4>
        </div>
    )
}

export default AdminHeader
