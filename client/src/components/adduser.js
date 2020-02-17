import React, { Component } from 'react';
import { getDeptQuery, addNewUserMutation } from '../queries/queries';
import { flowRight as compose } from 'lodash';
import { graphql } from 'react-apollo';
import crypto from 'crypto';

class AddDataTest extends Component {
    constructor(props) {
        super(props);
        // set the inital state of this component
        this.state = {
            first_name: '',
            last_name: '',
            department: '',
            email: '',
            apikey: '',
        };
    }

    getDepartments() {
        let data = this.props.getDeptQuery;
        if (data.loading) {
            return <option disabled>Loading data .... </option>;
        } else {
            return data.Depts.map((item) => {
                return (
                    <option key={item.department} value={item.department}>
                        {item.department}
                    </option>
                );
            });
        }
    }

    refreshPage() {
        window.location.reload(true);
    }

    submitForm(e) {
        e.preventDefault();
        this.props.addNewUserMutation({
            variables: {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                department: this.state.department,
                email: this.state.email,
                // generate a random API Key code
                apikey: crypto.randomBytes(Math.ceil(10 / 2)).toString('hex'),
            },
        });
        // Not best method for performance but OK for a demo
        this.refreshPage();
    }

    render() {
        return (
            <div>
                <form id="addUser" onSubmit={this.submitForm.bind(this)}>
                    <div className="field">
                        <label>First Name:</label>
                        <br />
                        <input
                            type="text"
                            onChange={(e) => this.setState({ first_name: e.target.value })}
                        />
                    </div>

                    <div className="field">
                        <label>Last Name:</label>
                        <br />
                        <input
                            type="text"
                            onChange={(e) => this.setState({ last_name: e.target.value })}
                        />
                    </div>

                    <div className="field">
                        <label>Department Name:</label>
                        <br />
                        <select onChange={(e) => this.setState({ department: e.target.value })}>
                            {this.getDepartments()}
                        </select>
                    </div>

                    <div className="field">
                        <label>Email Address:</label>
                        <br />
                        <input
                            type="email"
                            onChange={(e) => this.setState({ email: e.target.value })}
                        />
                    </div>

                    <button>(+) Add User</button>
                </form>
            </div>
        );
    }
}

// Using compose to bind multiple (queries) to the (component)
export default compose(
    graphql(getDeptQuery, { name: 'getDeptQuery' }),
    graphql(addNewUserMutation, { name: 'addNewUserMutation' }),
)(AddDataTest);
