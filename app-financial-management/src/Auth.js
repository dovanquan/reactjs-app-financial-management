import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

const Auth = () => (
  <Router>
    <div class="menu">
      <AuthButton />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/protected" component={Protected} />
      <PrivateRoute path="/edit" component={Profile} />
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
const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
        <div>
        <div class="headerInfo">
            <div class="dropdown">
              <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                {infoUser.name} <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li><Link to="/edit">Edit name</Link></li>
                <li class="signOut"><a onClick={() => { fakeAuth.signout(() => history.push("/"));}}>Sign out</a></li>
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

const Protected = () => <div class="contentInfo"><h3>Protected</h3></div>
const Profile = () => <div class="contentInfo">
  <h3>Thay doi ten nguoi dung</h3>
  <input type="text" value={infoUser.name}  />
  <button>save</button>
</div>

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
        <div class="jumbotron">
          <h1 class="display-3">Login</h1>
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