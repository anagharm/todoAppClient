import React from 'react'
import { Formik, Form } from 'formik'
import  * as Yup from 'yup'
import FormikControl from '../../hoc/FormikComponents/FormikControl.js'
import { useMutation } from 'react-query'
import ToastInstance from '../../hoc/NotificationSettings/ToastInstance'
import { useHistory } from "react-router-dom";
import Fetcher from '../../hoc/FetcherSetting/FetcherSetting'

function SignUp() {

    const history = useHistory();

    const initialValues = {
        firstName           : "",
        lastName            : "",
        emailId             : "",
        password            : "",
        confirmPassword     : "",
        role                : "user"
    }

    const validationSchema = Yup.object({
        firstName       : Yup.string().required('Required!!'),
        lastName        : Yup.string().required('Required!!'),
        emailId         : Yup.string().email('Invalid Email Format').required('Required!!'),
        password        : Yup.string().required('Required!!'),
        confirmPassword : Yup.string().oneOf([Yup.ref('password'),''], 'Password must match').required('Required!!'),
    })
    
    const onSubmit = values => {
        console.log('Form data ',values)
        mutation.mutate(values)
    }

    const mutation = useMutation((params) => Fetcher('post','/api/user/post/signup',params), {
		onSuccess(data){
			console.log('Got response from backend',data)
            if(data.data.errorCode === 0){
                ToastInstance('Success','User Registered')
                history.push('/signin');
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
                                    <FormikControl control='input' type='text' label='First Name' name='firstName' placeholder="First Name" />
                                    <FormikControl control='input' type='text' label='Last Name' name='lastName' placeholder="Last Name" />
                                    <FormikControl control='input' type='email' label='Email' name='emailId' placeholder="Email ID" />
                                    <FormikControl control='input' type='password' label='Password' name='password' placeholder="Password" />
                                    <FormikControl control='input' type='password' label='confirmPassword' name='confirmPassword' placeholder="Confirm Password" />
                                    <div className="row">
                                        <button type="submit" className="btn btn-primary" disabled={!formik.isValid}>Submit</button>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 align-right">
                                            <a href="/signin">Sign In</a>
                                        </div>
                                    </div>
                                </Form>
                }
        </Formik>
    )
}

export default SignUp
