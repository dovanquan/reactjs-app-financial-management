import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
  } from "react-router-dom";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editValue :this.props.username,
            isUpdated :false
        }
    }

    handleChange = (e) => {
        this.setState({
            editValue:e.target.value
        })
    }

    updateName = (editValue) => {
        localStorage.setItem('newName', editValue)
        this.setState({
            isUpdated:true
        })
    }

    render() {
        if (this.state.isUpdated) {
            return <Redirect to="/protected" />;
        }

        return (
            <div className="contentInfo">
                <h3>Nhập tên và nhấn nút save để thay đổi tên mặc định của bạn.</h3>
                <input type="text" value={this.state.editValue}  onChange={(e) => { this.handleChange(e) }} />
                <button onClick={() => { this.updateName(this.state.editValue) }}>save</button>
            </div>
        );
    }
}

export default Profile;
