import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import GoogleLogin from 'react-google-login';
import Welcome from './Welcome';
import Profile from './Profile';
import Addwallet from './Addwallet';


const Protected = () => <Welcome />
const UpdateName = () => <Profile username={username} />
const Notice = () => <div className="contentInfo"><h3>Cập nhật thành công!</h3></div>
const Wallet = () => <Addwallet />

const Auth = () => (
  <Router>
    <div className="menu">
      <AuthButton />
      <Route path="/login" exact component={Login} />
      <PrivateRoute path="/protected" component={Protected} />
      <PrivateRoute path="/edit" component={UpdateName} />
      <PrivateRoute path="/notice" component={Notice} />
      <PrivateRoute path="/Addwallet" component={Wallet} />
    </div>
  </Router>
);

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};


let infoUser = JSON.parse(localStorage.getItem('infoUser'));
let newName = localStorage.getItem('newName')
console.log(newName);
let username = (newName !== '') ? newName : infoUser.name
const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
        <div>
        <div className="headerInfo">
            <div className="dropdown">
              <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                {username} <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
                <span className="caret"></span>
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li><Link to="/edit">Edit name</Link></li>
                <li><Link to="/Addwallet">Add wallet</Link></li>
                <li className="signOut"><a onClick={() => { fakeAuth.signout(() => history.push("/"));}}>Sign out</a></li>
              </ul>
            </div>
        </div>
      </div> 
    ) : (
      <Route><Redirect to="/login" /></Route>
    )
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  };

  render() {
    const responseGoogle = (response) => {
      fakeAuth.authenticate(() => {
        this.setState({ redirectToReferrer: true })
        localStorage.setItem('infoUser', JSON.stringify(response.profileObj))
      });
    }  
    const { from } = this.props.location.state || { from: { pathname: "/" } }
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to="/protected" />;
    }

    return (
      <div id="main-content">
      <div id="header">
        <div className="jumbotron">
          <h1 className="display-3">Login</h1>
          <p>
            <GoogleLogin
              clientId="899159168724-dp2fi0kfp1op25eh4qr38a1gv8t9ah92.apps.googleusercontent.com"
              buttonText="Login account google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
          </p>
        </div>
      </div>
      <div id="content"></div>
      <div id="footer"></div>
      
      </div>
    );
  }
}

export default Auth;