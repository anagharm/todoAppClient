import React from 'react'
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function DatePicker(props) {
    const { label, name, ...rest} = props
    return (
        <div className='form-group' style={{"margin":"3%"}}>
            <label style={{"marginBottom":"1%"}} htmlFor={name}><strong>{label}</strong></label>
            <Field className="form-control" name={name}>
                {
                    ({form, field}) => {
                        const { setFieldValue } = form
                        const { value } = field
                        return <DateView className="form-control"  id={name} {...field} {...rest} selected={value} onChange={val => setFieldValue(name,val)}/>
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default DatePicker