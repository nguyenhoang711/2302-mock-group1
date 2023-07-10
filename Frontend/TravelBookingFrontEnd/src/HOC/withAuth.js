import React from 'react';
import { Redirect } from 'react-router-dom';
import storage from '../Storage/Storage';

function withAuth(AuthenticatedComponent) {

    class HOC extends React.Component {

        isAuthenticated = () => {
            return storage.getToken() !== null && storage.getToken() !== undefined;
        }

        render() {
            return !this.isAuthenticated() ? <Redirect to='/auth/sign-in' /> : <AuthenticatedComponent {...this.props} />;
        }
    }

    return HOC;
}

export default withAuth;

