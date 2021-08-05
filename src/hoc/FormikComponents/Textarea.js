import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Textarea(props) {
    const { label , name, ...rest } = props
    return (
        <div className="form-group" style={{"margin":"3%"}}>
            <label style={{"marginBottom":"1%"}} htmlFor={name}>{label}</label>            
            <Field className="form-control" as="textarea" id={name} name={name} {...rest} />
            <ErrorMessage name={name} component={TextError}/>
        </div>
    )
}

export default Textarea