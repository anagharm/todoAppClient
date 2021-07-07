import React , { useState , useEffect} from 'react'
import Fetcher from '../../hoc/FetcherSetting/FetcherSetting'
import { useQuery , useMutation} from 'react-query'
import { useParams } from 'react-router'
import { useHistory } from "react-router-dom";
import { Formik, Form } from 'formik'
import  * as Yup from 'yup'
import FormikControl from '../../hoc/FormikComponents/FormikControl.js'
import ToastInstance from '../../hoc/NotificationSettings/ToastInstance'
import './UserCss.css'

function RegisterUser() {
    const backDate = () => {
        var todayDate = new Date();
        var year_18 = todayDate.getFullYear() - 18;
        return new Date(todayDate.getDate() + "-" + todayDate.getMonth() + "-" + year_18)
    }
    const history = useHistory();
    const { usercode } = useParams()
    const [APIUrl , setAPIUrl ] = useState('/api/profile/get/user/'+usercode)
    // const { data : user, isLoading } = useQuery('listUsers', () => Fetcher('get',APIUrl,{}) )
    // const mutation = useMutation((params) => Fetcher('post','/api/user/post/signup',params), {
	// 	onSuccess(data){
	// 		console.log('Got response from backend',data)
    //         if(data.data.errorCode === 0){
    //             ToastInstance('Success','User Registered')
    //             history.push('/signin');
    //         }else{
    //             var msg = 'User Not Registered - ' + data.data.errorMsg;
    //             ToastInstance('Error',msg)
    //         }
	// 	},
	// 	onError(error){
	// 		console.log('Got error from backend',error)
    //         ToastInstance('Error','User Not Registered'+error)
	// 	}
	// })
    // if(isLoading) return <h1>Loading</h1>
    const initialValues = {
        firstName           : "",
        lastName            : "",
        emailId             : "",
        mobNum              : "",
        dob                 : "",
        gender              : "",
        picUrl              : "",
    }
    const genderOptions = [
        { key: 'Select', value: '' },
        { key: 'Male', value: 'male' },
        { key: 'Female', value: 'female' },
        { key: 'Other', value: 'other' },
    ]
    const validationSchema = Yup.object({
        firstName       : Yup.string().required('Required!!'),
        lastName        : Yup.string().required('Required!!'),
        emailId         : Yup.string().email('Invalid Email Format').required('Required!!'),
        mobNum          : Yup.string(),
        dob             : Yup.date().default(function () { return new Date();}),
        gender          : Yup.string(),
        // picUrl          : "",
    })
    
    const onSubmit = values => {
        console.log('Form data ',values)
        // mutation.mutate(values)
    }
    return (
        <Formik
                initialValues       = {initialValues}
                validationSchema    = {validationSchema}
                onSubmit            = {onSubmit}
        >
                {
                    formik =>   <Form>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <FormikControl control='input' type='text' label='First Name' name='firstName' placeholder="First Name" />
                                        </div>
                                        <div className="col-lg-6">
                                            <FormikControl control='input' type='text' label='Last Name' name='lastName' placeholder="Last Name" />
                                        </div>
                                    </div>
                                    <FormikControl control='input' type='email' label='Email' name='emailId' placeholder="Email ID" />
                                    <div className="row">
                                        <button type="submit" className="btn btn-primary" disabled={!formik.isValid}>Submit</button>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 align-right">
                                            <a href="">Submit</a>
                                        </div>
                                    </div>
                                </Form>
                }
        </Formik>
    )
}

export default RegisterUser
