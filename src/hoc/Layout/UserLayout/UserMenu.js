import React from 'react'
import './AdminCss.css'
import Sidebar from './Sidebar'

function AdminMenu() {
    return (
        <div className="adminMenuInnerDiv">
            <div className="adminMenuLogoDiv">TO DO App</div>
            <div className="adminMenuUsrNameDiv">Anagha K</div>
            <div className="adminMenu">
                <Sidebar />
            </div>
        </div>
    )
}

export default AdminMenu
