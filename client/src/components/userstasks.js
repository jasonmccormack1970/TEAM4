import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { onError } from 'apollo-link-error';
import { Table } from 'react-bootstrap';
import { P_LOADING, P_ERROR, CARD_STYLE } from '../styles/jsx_styles';
import { loggedInUser } from '../utils/utils';

// Simulate a user is signed in
let luser = loggedInUser();
// important to use back ticks
const USER_TASKS_QUERY = gql`
    query UserTaskQuery {
        user_tasks(key:"${luser}") {
            title
            notes
            status
            status
            id
            assignedto
        }
    }
`;

function userstasks() {
    return (
        <div>
            <div className="card" style={{ marginTop: '10px' }}>
                <Query query={USER_TASKS_QUERY}>
                    {({ loading, error, data }) => {
                        if (loading) {
                            return <div style={P_LOADING}>Loading Data Please Wait ...</div>;
                        }
                        // catch apollo exceptions example network issues
                        if (error) {
                            return <div style={P_ERROR}>{error.message}</div>;
                        }
                        // catch graphql exceptions
                        if (onError.message === '') {
                            return (
                                <div style={P_ERROR}>
                                    There is a problem with your GraphQL query
                                </div>
                            );
                        }

                        return (
                            <div className="card">
                                <div className="card-body" style={CARD_STYLE}>
                                    <h5 className="card-title text-muted">
                                        GraphQL resolver returning "only" tasks assigned to logged
                                        in user table
                                    </h5>
                                    <div>
                                        <Table striped bordered hover size="sm">
                                            <thead>
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Notes</th>
                                                    <th>Status</th>
                                                    <th>Assigned to user ID</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.user_tasks.map((item) => (
                                                    <tr key={item.id} style={{ color: 'Blue' }}>
                                                        <td>{item.title}</td>
                                                        <td>{item.notes}</td>
                                                        <td>{item.status}</td>
                                                        <td>{item.assignedto}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        );
                    }}
                </Query>
            </div>
        </div>
    );
}

export default userstasks;
