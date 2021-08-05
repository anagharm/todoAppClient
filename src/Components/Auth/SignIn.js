import React from 'react'
import { Formik, Form } from 'formik'
import  * as Yup from 'yup'
import FormikControl from '../../hoc/FormikComponents/FormikControl'
import { useMutation } from 'react-query'
import ToastInstance from '../../hoc/NotificationSettings/ToastInstance'
import { useHistory } from "react-router-dom";
import Fetcher from '../../hoc/FetcherSetting/FetcherSetting'

function SignIn() {

    const history = useHistory();

    const initialValues = {
        emailId         : "",
        password        : "",
    }

    const validationSchema = Yup.object({
        emailId         : Yup.string().email('Invalid Email Format').required('Required!!'),
        password        : Yup.string().required('Required!!'),
    })
    
    const onSubmit = values => {
        console.log('Form data ',values)
        mutation.mutate(values)
    }

    const mutation = useMutation((params) => Fetcher('post','/api/user/post/login',params), {
		onSuccess(data){
			console.log('Got response from backend',data)
            if(data.data.errorCode === 0){
                ToastInstance('Success','User Logined In')
                localStorage.setItem("userCode",data.data.response.userCode)
                localStorage.setItem("role",data.data.response.role)
                localStorage.setItem("firstName",data.data.response.firstName)
                localStorage.setItem("lastName",data.data.response.lastName)
                localStorage.setItem("token",data.data.response.token)
                if(data.data.response.role === 'admin'){
                    history.push('/admin/task');
                }else{
                    history.push('/user/task');
                }
            }else{
                var msg = 'User Not Registered - ' + data.data.errorMsg;
                ToastInstance('Error',msg)
            }
		},
		onError(error){
			console.log('Got error from backend',error)
            ToastInstance('Error','User Not Registered'+error)
		}
	})

    return (
        <Formik
                initialValues       = {initialValues}
                validationSchema    = {validationSchema}
                onSubmit            = {onSubmit}
        >
                {
                    formik =>   <Form>
                                    <FormikControl control='input' type='email' label='Email' name='emailId' placeholder="Email ID" />
                                    <FormikControl control='input' type='password' label='Password' name='password' placeholder="Password" />
                                    <div className="row">
                                            <button type="submit" className="btn btn-primary" disabled={!formik.isValid}>Submit</button>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 align-right">
                                            <a href="/forgotpassword">Forgot Password</a>
                                        </div>
                                        <div className="col-lg-6 align-right">
                                            <a href="/signup">Sign Up</a>
                                        </div>
                                    </div>
                                </Form>
                }
        </Formik>
    )
}

export default SignIn
