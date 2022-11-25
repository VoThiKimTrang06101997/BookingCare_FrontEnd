import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import { handleLoginApi } from '../../services/userService';

// import * as actions from "../store/actions";

import * as actions from "../../store/actions";
import './Login.scss';
import { userLoginSucess } from '../../store/actions';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
        console.log(event.target.value)
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
        console.log(event.target.value)
    }

    handleLogin =  async () => {
        // console.log("username: ", this.state.username, "password: ", this.state.password)
        // console.log("all state: ", this.state)
        this.setState({
            errorMessage: ""
        })

        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            console.log("Check: ", data)

            if(data && data.errorCode !== 0) {
                this.setState({
                    errorMessage: data.message
                })
            }

            if(data && data.errorCode === 0) {
                // Todo
                this.props.userLoginSucess(data.user)
                console.log("Login sucessfully")
            }
        } catch (error) {
            if(error.response) {
                if(error.response.data) {
                    this.setState({
                        errorMessage: error.response.data.message
                    })
                }
            }
            console.log("Check", error.response)
        }
        
    }

    handleShowHidePassword =() => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        // JSX
        return (
           <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-center text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label htmlFor="">Username:</label>
                            <input type="text" className='form-control' placeholder='Enter your username' 
                            value={this.state.username} 
                            onChange={(event) => this.handleOnChangeUsername(event)} />
                        </div>

                        <div className='col-12 form-group login-input'>
                        <div className='col-12 form-group'>
                            <label htmlFor="">Password:</label>
                            <div className="custom-input-password"> 
                            <input 
                            className="form-control" type={this.state.isShowPassword ? "text" : "password"} placeholder='Enter your password'
                            onChange={(event) => {this.handleOnChangePassword(event)}}
                            />
                            <span 
                                onClick={() => {this.handleShowHidePassword()}}
                            ><i className={this.state.isShowPassword ? "far fa-eye": "far fa-eye-slash"}></i>
                            </span>
                            
                            </div>
                        </div>
                        </div>
                        
                        <div className='col-12' style={{color: "red"}}>
                            {this.state.errorMessage}
                        </div>

                        <div className='col-12'>
                            <button className='btn-login' onClick={() => {this.handleLogin()}} >Login</button>
                        </div>
                        
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'>Or Login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className='fab fa-google-plus-g google'></i>
                            <i className='fab fa-facebook-f facebook'></i>
                        </div>
                    </div>
                </div>
           </div>
    
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
       //  adminLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSucess: (userInfo) => dispatch(actions.userLoginSucess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
