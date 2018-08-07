import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';


class IndexComponet extends Component {
    constructor(props) {
        super(props);
            this.state = {
                editValue :this.props.infoUser.profileObj.name,
                isEdit : false,
            }
    }

    logout = () => {
        this.props.onUpdateStatus(false);
    }

    editName = (name) => {
        this.setState({
            isEdit:true
        })
    }
    handleChange = (e) => {
        this.setState({
            editValue: e.target.value
        })
    }

    formUpdate = (isEdit, editValue, name) => {
        return (isEdit) ? <input type="text" value={editValue} onChange={(e) => { this.handleChange(e) }} /> : editValue
    }

    updateButton = (isEdit, editValue, name) => {
        let beforeButton = <button onClick={() => { this.editName(localStorage.getItem('name')) }}>Edit name</button>
        let afterButton = <button onClick={() => { this.save(editValue) }}>Save</button>
        return (isEdit) ? afterButton : beforeButton;
    }

    save = (editValue) => {
        this.setState({
            editValue: editValue,
            isEdit:false
        })
    }

    render() {
        return (
            <div>
                <h3>Chao mung ban 
                    {this.formUpdate(this.state.isEdit, this.state.editValue, localStorage.getItem('name'))}
                    {this.updateButton(this.state.isEdit, this.state.editValue, localStorage.getItem('name'))}
                </h3>
                <GoogleLogout
                    buttonText="Logout"
                    onLogoutSuccess={this.logout}
                >
                </GoogleLogout>
            </div>
        )
    }
}

class LoginComponet extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const responseGoogle = (response) => {
            this.props.onUpdateStatus(true, response);
        }  
        return (
            <div>
                <h3>Ban phai login!</h3>
                <GoogleLogin
                clientId="899159168724-dp2fi0kfp1op25eh4qr38a1gv8t9ah92.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                />
            </div>
        )
    }
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            infoUser: ''
        }
    }
    
    renderRedirectIndex = () => {
        return <Redirect to='/index' />
    }
    
    renderRedirectLogin = () => {
        return <Redirect to='/login' />
    }

    updateStatus = (newStatus, response) => {
        console.log('update Status', newStatus);
        this.setState({
            status:newStatus,
            infoUser:response
        })
    }
        
    render() {
        if(this.state.status) {
            return (
                <IndexComponet onUpdateStatus={this.updateStatus} infoUser={this.state.infoUser}/>
            ) 
        } else {
            return (
                <LoginComponet onUpdateStatus={this.updateStatus}/>
            )
        }
    }
}

export default Home;
