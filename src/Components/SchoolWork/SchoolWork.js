import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../hoc/FormikComponents/FormikControl.js'
import { useMutation, useQuery } from 'react-query'
import ToastInstance from '../../hoc/NotificationSettings/ToastInstance'
import Fetcher from '../../hoc/FetcherSetting/FetcherSetting'
import { useQueryClient } from 'react-query'
import moment from 'moment'

function SchoolWork() {
    const queryClient = useQueryClient();
    const [initialValues, setInitialValues] = useState({ 
                                                            id                      : "", 
                                                            subject				    : "",
                                                            subjectId				: "",
                                                            typeOfAssignment		: "",
                                                            typeOfAssignmentId		: "",
                                                            status  				: "",
                                                            statusId				: "",
                                                            workDate 				: "",
                                                            userCode 				: localStorage.getItem("userCode"), 
                                                            details                 : "",
                                                            docLink                 : "",
                                                        })
    const validationSchema = Yup.object({
        subjectId				: Yup.string().required('Required!!'),
        typeOfAssignmentId		: Yup.string().required('Required!!'),
        statusId				: Yup.string().required('Required!!'),
        workDate 				: Yup.string().required('Required!!'),
        userCode 				: Yup.string().required('Required!!'),
    })
    const { data: typeOfAssignmentList, isLoading : typeOfAssignmentLoading } = useQuery(
        'typeOfAssignmentList',
        () => Fetcher('get', '/api/typeofassignment/get/list/typeofassignmentkeyvalue', {}))
    const { data: subjectList, isLoading : subjectLoading } = useQuery(
            'subjectList',
            () => Fetcher('get', '/api/subject/get/list/subjectkeyvalue', {}))
    const { data: statusList, isLoading : statusLoading } = useQuery(
        'statusList',
        () => Fetcher('get', '/api/status/get/list/statuskeyvalue', {}))
    const onSubmit = (values, { setSubmitting, resetForm }) => {
        values.subject          = subjectList.data.response.find(item => item._id === values.subjectId).key
        values.typeOfAssignment = typeOfAssignmentList.data.response.find(item => item._id === values.typeOfAssignmentId).key
        values.status           = statusList.data.response.find(item => item._id === values.statusId).key
        values.workDate         =  moment(values.workDate).format("YYYY-MM-DD")
        console.log("values ",values)
        resetForm({ 
            id                      : "", 
            subject					: "",
            subjectId				: "",
            typeOfAssignment		: "",
            typeOfAssignmentId		: "",
            status					: "",
            statusId				: "",
            workDate 				: "",
            userCode 				: "", 
        })
        if(values.id === ""){
            mutation.mutate(values)
        }else{
            mutationEdit.mutate(values)
        }
    }
    const mutation = useMutation((params) => Fetcher('post', '/api/schoolworks/post/data', params), {
        onSuccess(data) {
            if (data.data.errorCode === 0) {
                ToastInstance('Success', 'Status Added')
                queryClient.invalidateQueries('listschoolwork');
            } else {
                var msg = 'School Work - ' + data.data.errorMsg;
                ToastInstance('Error', msg)
            }
        },
        onError(error) {
            console.log('Got error from backend', error)
            ToastInstance('Error', 'School Work' + error)
        }
    })
    const mutationEdit = useMutation((params) => Fetcher('patch', '/api/schoolworks/patch/data', params), {
        onSuccess(data) {
            if (data.data.errorCode === 0) {
                ToastInstance('Success', 'Status Edited')
                queryClient.invalidateQueries('listschoolwork');
                setInitialValues({ 
                    id                      : "", 
                    subject					: "",
                    subjectId				: "",
                    typeOfAssignment		: "",
                    typeOfAssignmentId		: "",
                    status					: "",
                    statusId				: "",
                    workDate 				: "",
                    userCode 				: "", 
                })
            } else {
                var msg = 'School Work - ' + data.data.errorMsg;
                ToastInstance('Error', msg)
            }
        },
        onError(error) {
            console.log('Got error from backend', error)
            ToastInstance('Error', 'School Work' + error)
        }
    })
    const mutationDelete = useMutation((params) => Fetcher('delete', '/api/status/delete/status', params), {
        onSuccess(data) {
            if (data.data.errorCode === 0) {
                ToastInstance('Success', 'Status Deleted')
                queryClient.invalidateQueries('liststatus');
            } else {
                var msg = 'Status - ' + data.data.errorMsg;
                ToastInstance('Error', msg)
            }
        },
        onError(error) {
            console.log('Got error from backend', error)
            ToastInstance('Error', 'Status' + error)
        }
    })
    
    function editData(item) {
        setInitialValues({
            id: item._id,
            status: item.status
        })
    }
    function deleteData(deleteId) {
        var jsonRequest = { id: deleteId }
        mutationDelete.mutate(jsonRequest)
    }
    if (subjectLoading && statusLoading && typeOfAssignmentLoading)  return <h1>Loading</h1>

    return (
        <div>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {
                    formik => <Form>
                        <div className="row">
                            <div className="col-lg-5 col-lg-offset-1">
                                <FormikControl control='date' type='text' label='Date' name='workDate' placeholder="Date"/>
                            </div>
                            <div className="col-lg-5 col-lg-offset-1">
                                <FormikControl control='select' label='Subject' name='subjectId' options={subjectList.data.response || [{key:"",value:"Select"}]} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-5 col-lg-offset-1">
                                <FormikControl control='select' label='Type of Work' name='typeOfAssignmentId' options={typeOfAssignmentList.data.response || [{key:"",value:"Select"}]} />
                            </div>
                            <div className="col-lg-5 col-lg-offset-1">
                                <FormikControl control='select' label='Status' name='statusId' options={statusList.data.response || [{key:"",value:"Select"}]} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-10 col-lg-offset-1">
                                <FormikControl control='textarea' type='text' label='Description' name='details' placeholder="Description" />
                            </div>
                        </div> 
                        <div className="row">
                            <div className="col-lg-10 col-lg-offset-1">
                                <FormikControl control='file' type='text' label='Doc Link' name='docLink' placeholder="Doc Link" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-10"></div>
                            <div className="col-lg-2" >
                                <button type="submit" className="btn btn-primary" disabled={!formik.isValid}>Submit</button>
                            </div>
                        </div>
                        
                    </Form>
                }
            </Formik>       
        </div>
    )
}

export default SchoolWork
