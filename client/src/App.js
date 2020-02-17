import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import { Container } from 'react-bootstrap';

import { NavigationBar } from './components/navigationbar';
import Home from './pages/home';
import Example from './pages/example';
import Example2 from './pages/example2';
import Example3 from './pages/example3';
import Example4 from './pages/example4';
import Empty from './pages/empty';
import MissingRoute from './pages/MissingRoute';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

//////////////////////////////////////////////////////////

const client = new ApolloClient({
    uri: 'http://localhost:3600/graphql',
});

function App(message) {
    return (
        <div>
            <ApolloProvider client={client}>
                <React.Fragment>
                    <Container>
                        <div>{message.text}</div>
                        <NavigationBar />
                        <Router>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/example" component={Example} />
                                <Route exact path="/example2" component={Example2} />
                                <Route exact path="/example3" component={Example3} />
                                <Route exact path="/example4" component={Example4} />
                                <Route exact path="/empty" component={Empty} />
                                <Route component={MissingRoute} />
                            </Switch>
                        </Router>
                    </Container>
                </React.Fragment>
            </ApolloProvider>
        </div>
    );
}

export default App;
