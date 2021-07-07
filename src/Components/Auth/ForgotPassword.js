import React, { Component } from 'react'
import './AuthCss.css'

export default class ForgotPassword extends Component {
    render() {
        return (
            <div className="authSign">
                <div className="row">
                    <div className="col-lg-6 authSignImgDiv">
                    </div>
                    <div className="col-lg-6 authSignForgotPasswordFormDiv">
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                                <button type="submit" className="btn btn-success">Send OTP</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}