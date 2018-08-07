import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

class IndexComponet extends Component {
    constructor(props) {
        super(props);
    }

    logout = () => {
        this.props.onUpdateStatus(false);
    }

    render() {
        return (
            <div>
                <h3>Chao mung ban den voi trang chu</h3>
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
            this.props.onUpdateStatus(true);
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

// const Index1 = () => <IndexComponet onUpdateStatus={this.updateStatus}/>;
// const Login = () => <LoginComponet onUpdateStatus={this.updateStatus}/>;
const Login = () => <LoginComponet />;
// const Index = () => <IndexComponet />;
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: this.props.status
        }
    }
    
    renderRedirectIndex = () => {
        return <Redirect to='/index' />
    }
    
    renderRedirectLogin = () => {
        return <Redirect to='/login' />
    }

    updateStatus = (status) => {
        this.setState({
            status:status
        })
    }

    
    update() {

        if(this.state.status) {
            return <IndexComponet onUpdateStatus={this.updateStatus}/>            
        } else {
            return <LoginComponet onUpdateStatus={this.updateStatus}/> 
        }
    }
        
    render() {
        return (
            <div>{this.update()}</div>
        )
    }
}

export default Home;