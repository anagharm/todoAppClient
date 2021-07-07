import React, { useState } from 'react'
import Fetcher from '../../hoc/FetcherSetting/FetcherSetting'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { useHistory } from "react-router-dom";
import './UserCss.css'

function ViewUser() {
    const history = useHistory();
    const { usercode } = useParams()
    const [APIUrl , setAPIUrl ] = useState('/api/profile/get/user/'+usercode)
    const { data : user, isLoading } = useQuery('listUsers', () => Fetcher('get',APIUrl,{}) )
    if(isLoading) return <h1>Loading</h1>
    function editUser() {
        history.push('/admin/user/edit/'+usercode);
    }
    return (
        <div className="row">
            <div className="col-lg-3">
                    <img src="../../assets/img/profileImg.png" className="rounded float-left dummyUserImg" />
            </div>
            <div className="col-lg-8 pl-4" >
                <div className="row viewDiv">
                    <div className="col-lg-2">
                       <strong> Name    :</strong>
                    </div>
                    <div className="col-lg-10 text-left">
                        {user.data.response.fullName}
                    </div>
                </div>
                <div className="row viewDiv">
                    <div className="col-lg-2">
                        <strong>Email ID    :</strong>
                    </div>
                    <div className="col-lg-10 text-left">
                        {user.data.response.emailId}
                    </div>
                </div>
                <div className="row viewDiv">
                    <div className="col-lg-2">
                        <strong>Mobile   :</strong>
                    </div>
                    <div className="col-lg-10 text-left">
                        {user.data.response.mobNum ||"-"}
                    </div>
                </div>
                <div className="row viewDiv">
                    <div className="col-lg-2">
                        <strong>Gender   :</strong>
                    </div>
                    <div className="col-lg-10 text-left">
                        {user.data.response.gender ||"-"}
                    </div>
                </div>
                <div className="row viewDiv">
                    <div className="col-lg-2">
                        <strong>DOB   :</strong>
                    </div>
                    <div className="col-lg-10 text-left">
                        {user.data.response.dob ||"-"}
                    </div>
                </div>
                <div className="row viewDiv">
                    <div className="col-lg-2">
                        <strong>Role   :</strong>
                    </div>
                    <div className="col-lg-10 text-left">
                        {user.data.response.role ||"-"}
                    </div>
                </div>
            </div>
            <div className="col-lg-1">
                <button type="button" className="btn btn-success" onClick={() =>editUser()}>Edit</button>
            </div>
        </div>
    )
}

export default ViewUser
