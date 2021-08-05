import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError.js'

function FileUpload(props) {
    const { label, name, ...rest } = props
    return (
        <>
            <div className="form-group" style={{"margin":"3%"}}>
                <label style={{"marginBottom":"1%"}}><strong>{label}</strong></label>
                {/* <Field className="form-control" as="file" id={name} name={name} {...rest} /> */}
                <Field as='select' className="form-control" id={name} name={name} {...rest} >
                {({
               field, // { name, value, onChange, onBlur }
               form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
               meta,
             }) => (
               <div>
                 <input type="file" {...field} />
                 {meta.touched && meta.error && (
                   <div className="error">{meta.error}</div>
                 )}
               </div>
             )}
                </Field>
                <ErrorMessage name={name} component={TextError}/>
            </div>
        </>
    )
}

export default FileUpload
