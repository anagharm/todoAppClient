import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Select(props) {
    const { label, name, options, ...rest } = props
    return (
        <div className="form-group" style={{"margin":"3%"}}>
            <label style={{"marginBottom":"1%"}}><strong>{label}</strong></label>
            <Field as='select' className="form-control" id={name} name={name} {...rest} >
                {
                    options.map(option => {
                        return(
                            <option key={option.value} value={option.value}>
                                {option.key}
                            </option>
                        )
                    })
                }
            </Field>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    )
}

export default Select