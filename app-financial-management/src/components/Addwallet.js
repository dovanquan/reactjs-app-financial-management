import React, { Component } from 'react';
import '../css/Addwallet.css';

class Addwallet extends Component {
    
    render() {
        return (
            <div className="container bs-docs-container">
                <div className="wallet-button-add"><button type="button" class="btn btn-primary btn-lg active">Add wallet</button></div>
                <table class="table table-bordered"> 
                    <thead> <tr> <th>#</th> <th>Name wallet</th> <th>Description</th></tr></thead>
                    <tbody>
                        <tr> <th scope="row">1</th> <td>Mark</td> 
                        <td>
                            <button type="button" class="btn btn-warning">Edit</button>
                            <button type="button" class="btn btn-danger">Delete</button>
                        </td>
                        </tr>
                    </tbody> 
                </table>
            </div>
        );
    }
}

export default Addwallet;
