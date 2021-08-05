import React, { useState } from 'react'
import Modal from "react-modal";
import SchoolWork from './SchoolWork';
import './SchoolWork.css'
import * as FaIcons from 'react-icons/fa';
import { useQuery } from 'react-query'
import Fetcher from '../../hoc/FetcherSetting/FetcherSetting'
import { useQueryClient } from 'react-query'

Modal.setAppElement("#root");

function SchoolWorkView() {
    const [monthList , setMonthList] = useState(["Select","March","April","June","July" , "August", "September", "October" , "November" , "December" , "January" , "February"])
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const { data: statusList, isLoading : statusLoading } = useQuery(
        'statusList',
        () => Fetcher('get', '/api/status/get/list/statuskeyvalue', {}))

    const { data: typeOfAssignmentList, isLoading : typeOfAssignmentLoading } = useQuery(
            'typeOfAssignmentList',
            () => Fetcher('get', '/api/typeofassignment/get/list/typeofassignmentkeyvalue', {}))
    if (statusLoading && typeOfAssignmentLoading)  return <h1>Loading</h1>

    return (
        <div className="row" style={{"textAlign":"center"}}>
            <div className="row" style={{marginBottom:"1%"}}>
                <div className="col-lg-11"></div>
                <div className="col-lg-1 float-right" >
                    <button type="submit" className="btn btn-success" onClick={() => setIsOpen(true)} >Add</button>
                </div>
                <Modal 
                    isOpen={modalIsOpen}
                    className="mymodal"
                    overlayClassName="myoverlay"
                    closeTimeoutMS={500}
                >
                    <div className="row">
                        <div className="col-lg-11"></div>
                        <div className="col-lg-1 " >
                            <FaIcons.FaWindowClose onClick={() => setIsOpen(false)} />
                        </div>
                    </div>
                    <SchoolWork />
                </Modal>
            </div>
            <div className="row" >
                <div className="schoolWorkView">
                    <div className="row" style={{"marginTop":"1%","marginBottom":"1%"}}>
                            <div className="col-lg-4">
                                <label htmlFor="months"><strong>Month :&nbsp;&nbsp;</strong></label>
                                <select id="months">
                                    {
                                        monthList.map((item , index) => (
                                            <option value={item} key={index}>{item}</option>
                                        ))
                                    }
                                    
                                </select>
                            </div>
                            <div className="col-lg-4">
                                <label htmlFor="status"><strong>Status :&nbsp;&nbsp;</strong></label>
                                <select id="status">
                                    {
                                        statusList.data.response.map((item , index) => (
                                            <option value={item.value} key={index}>{item.key}</option>
                                        ))
                                    }
                                    
                                </select>
                            </div>
                            <div className="col-lg-4">
                                <label htmlFor="typeOfWork"><strong>Type of Work :&nbsp;&nbsp;</strong></label>
                                <select id="typeOfWork">
                                    {
                                        typeOfAssignmentList.data.response.map((item , index) => (
                                            <option value={item.value} key={index}>{item.key}</option>
                                        ))
                                    }
                                    
                                </select>
                            </div>
                    </div>
                    <div className="row">Table</div>
                </div>
            </div>
        </div>
    )
}

export default SchoolWorkView
