import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError.js'

function Input(props) {
    const { label, name, ...rest } = props
    return (
        <>
            <div className="form-group" style={{"margin":"3%"}}>
                <label style={{"marginBottom":"1%"}}><strong>{label}</strong></label>
                <Field className="form-control" id={name} name={name} {...rest} />
                <ErrorMessage name={name} component={TextError}/>
            </div>
        </>
    )
}

export default Input