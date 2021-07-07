import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../hoc/FormikComponents/FormikControl.js'
import { useMutation, useQuery } from 'react-query'
import ToastInstance from '../../hoc/NotificationSettings/ToastInstance'
import Fetcher from '../../hoc/FetcherSetting/FetcherSetting'
import * as BiIcons from 'react-icons/bi';
import * as AiIcons from 'react-icons/ai';
import { useQueryClient } from 'react-query'

function ToDoTask() {
    const queryClient = useQueryClient();
    const [initialValues, setInitialValues] = useState({
        id              : "",
        task            : "",
        userCode        : localStorage.getItem("userCode"),
        status          : ""
    })
    const validationSchema = Yup.object({
        task            : Yup.string().required('Required!!'),
        status          : Yup.string().required('Required!!'),
    })
    const onSubmit = (values, { setSubmitting, resetForm }) => {
        console.log("values ",values)
        resetForm(initialValues)
        if(values.id === ""){
            mutation.mutate(values)
        }else{
            mutationEdit.mutate(values)
        }
    }
    const mutation = useMutation((params) => Fetcher('post', '/api/todolist/post/data', params), {
        onSuccess(data) {
            if (data.data.errorCode === 0) {
                ToastInstance('Success', 'Status Added')
                queryClient.invalidateQueries('listtask');
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
    const mutationEdit = useMutation((params) => Fetcher('patch', '/api/todolist/patch/data', params), {
        onSuccess(data) {
            if (data.data.errorCode === 0) {
                ToastInstance('Success', 'Status Edited')
                queryClient.invalidateQueries('listtask');
                setInitialValues({  
                                    id              : "",
                                    task            : "",
                                    userCode        : localStorage.getItem("userCode"),
                                    status          : "" 
                                })
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
    const mutationDelete = useMutation((params) => Fetcher('delete', '/api/todolist/delete/task', params), {
        onSuccess(data) {
            if (data.data.errorCode === 0) {
                ToastInstance('Success', 'Status Deleted')
                queryClient.invalidateQueries('listtask');
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
    const { data: taskList, isLoading } = useQuery(
                        'listtask',
                        () => Fetcher('get', '/api/todolist/get/tasklistuserwise/' + localStorage.getItem("userCode"), {}))
    const { data: statusList, isLoading : statusLoading } = useQuery(
        'statusList',
        () => Fetcher('get', '/api/status/get/list/statuskeyvalue', {}))
    function editData(item) {
        console.log("item ", item)
        setInitialValues({
            id              : item._id,
            task            : item.task,
            userCode        : item.userCode,
            status          : item.status
        })
        console.log("edit initialValues ", initialValues)
    }
    function deleteData(deleteId) {
        var jsonRequest = { id: deleteId }
        mutationDelete.mutate(jsonRequest)
    }
    if (isLoading || statusLoading) return <h1>Loading</h1>
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
                            <div className="col-lg-6">
                                <FormikControl control='input' type='text' label='Task' name='task' placeholder="Task" />
                            </div>
                            <div className="col-lg-3">
                                <FormikControl control='select' label='Status' name='status' options={statusList.data.response || [{key:"",value:"Select"}]} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-10"></div>
                            <div className="col-lg-2">
                                <button type="submit" className="btn btn-primary" disabled={!formik.isValid}>Submit</button>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-lg-19 col-lg-offset-1">
                                <table className="table table-bordered table-striped" >
                                    <thead className="table-primary">
                                        <tr>
                                            <th scope="col" className="text-center" style={{ "width": "100px" }}>Sr. No.</th>
                                            <th scope="col" className="text-center" style={{ "width": "700px" }}>Task</th>
                                            <th scope="col" className="text-center">Status</th>
                                            <th scope="col" className="text-center" style={{ "width": "120px" }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            taskList.data.response.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="text-center">{index + 1}.</td>
                                                        <td>{item.task}</td>
                                                        <td>{item.status}</td>
                                                        <td className="text-center">
                                                            <span style={{ "marginRight": "6%", "cursor": "pointer" }} onClick={() => editData(item)}><BiIcons.BiEdit /></span>
                                                            <span style={{ "marginLeft": "6%", "cursor": "pointer" }} onClick={() => deleteData(item._id)}><AiIcons.AiOutlineDelete /></span>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Form>
                }
            </Formik>

        </div>
    )
}

export default ToDoTask
