import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { onError } from 'apollo-link-error';
import { loggedInUser } from '../utils/utils';

// important to use back ticks
let ME_QUERY = gql`
    query MeQuery {
        about_Me(key: "${loggedInUser()}") {
            fullName
            email
            department
            id
            active
        }
    }
`;
function me() {
    return (
        <Query query={ME_QUERY}>
            {({ loading, error, data }) => {
                if (loading) {
                    return <div style={{ color: 'Blue' }}>Loading Data Please Wait ...</div>;
                }
                // catch apollo exceptions example network issues
                if (error) {
                    return <div style={{ color: 'Red' }}>{error.message}</div>;
                }
                // catch graphql exceptions
                if (onError.message === '') {
                    return (
                        <div style={{ color: 'Red' }}>
                            There is a problem with your GraphQL query
                        </div>
                    );
                }

                return (
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title text-muted">
                                Resolver returning 1 user from the Postgres user table
                            </h5>
                            <div style={{ color: 'Blue' }}>
                                <div>
                                    Currently logged in as = {data.about_Me.fullName} User id{' '}
                                    {data.about_Me.id}
                                </div>
                                <div>Department: {data.about_Me.department}</div>
                                <div>Email: {data.about_Me.email}></div>
                                <div>Active: {data.about_Me.active}</div>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Query>
    );
}

export default me;
