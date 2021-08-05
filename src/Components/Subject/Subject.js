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

function Subject() {
    const queryClient = useQueryClient();
    const [initialValues, setInitialValues] = useState({ id: "", subject: "" })
    const validationSchema = Yup.object({
        subject: Yup.string().required('Required!!'),
    })
    const onSubmit = (values, { setSubmitting, resetForm }) => {
        console.log("values ",values)
        resetForm({ id: "", subject: "" })
        if(values.id === ""){
            mutation.mutate(values)
        }else{
            mutationEdit.mutate(values)
        }
    }
    const mutation = useMutation((params) => Fetcher('post', '/api/subject/post/data', params), {
        onSuccess(data) {
            if (data.data.errorCode === 0) {
                ToastInstance('Success', 'subject Added')
                queryClient.invalidateQueries('listsubject');
            } else {
                var msg = 'Subject - ' + data.data.errorMsg;
                ToastInstance('Error', msg)
            }
        },
        onError(error) {
            console.log('Got error from backend', error)
            ToastInstance('Error', 'Subject' + error)
        }
    })
    const mutationEdit = useMutation((params) => Fetcher('patch', '/api/subject/patch/data', params), {
        onSuccess(data) {
            if (data.data.errorCode === 0) {
                ToastInstance('Success', 'Subject Edited')
                queryClient.invalidateQueries('listsubject');
                setInitialValues({ id: "", subject: "" })
            } else {
                var msg = 'Subject - ' + data.data.errorMsg;
                ToastInstance('Error', msg)
            }
        },
        onError(error) {
            console.log('Got error from backend', error)
            ToastInstance('Error', 'Subject' + error)
        }
    })
    const mutationDelete = useMutation((params) => Fetcher('delete', '/api/subject/delete/subject', params), {
        onSuccess(data) {
            if (data.data.errorCode === 0) {
                ToastInstance('Success', 'Subject Deleted')
                queryClient.invalidateQueries('listsubject');
            } else {
                var msg = 'Subject - ' + data.data.errorMsg;
                ToastInstance('Error', msg)
            }
        },
        onError(error) {
            console.log('Got error from backend', error)
            ToastInstance('Error', 'Subject' + error)
        }
    })
    const { data: subjectList, isLoading } = useQuery(
        'listsubject',
        () => Fetcher('get', '/api/subject/get/list/subject', {}))
    function editData(item) {
        setInitialValues({
            id: item._id,
            subject: item.subject
        })
    }
    function deleteData(deleteId) {
        var jsonRequest = { id: deleteId }
        mutationDelete.mutate(jsonRequest)
    }
    if (isLoading) return <h1>Loading</h1>
    console.log("initialValues ", initialValues)

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
                        <div className="col-lg-10 col-lg-offset-1">
                            <FormikControl control='input' type='text' label='Subject' name='subject' placeholder="subject" />
                        </div>
                        <div className="row">
                            <div className="col-lg-10"></div>
                            <div className="col-lg-2" style={{ "marginTop": "-6%" }}>
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
                                            <th scope="col" className="text-center">Subject</th>
                                            <th scope="col" className="text-center" style={{ "width": "120px" }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            subjectList.data.response.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="text-center">{index + 1}.</td>
                                                        <td>{item.subject}</td>
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

export default Subject
