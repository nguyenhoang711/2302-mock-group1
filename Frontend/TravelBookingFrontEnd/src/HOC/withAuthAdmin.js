import React from 'react';
import { Redirect } from 'react-router-dom';
import storage from '../Storage/Storage';

function withAuthAdmin(AuthenticatedComponent) {

    class HOC extends React.Component {

        isAuthenticated = () => {
            return storage.getToken() !== null && storage.getToken() !== undefined && localStorage.getItem('role') == 'ADMIN';
        }

        render() {
            const isAuthenticated = this.isAuthenticated();
          
            if (!isAuthenticated) {
              alert("Bạn không có quyền truy cập vào trang này!");
            }
          
            return isAuthenticated ? <AuthenticatedComponent {...this.props} /> : <Redirect to="/auth/sign-in" />;
          }
    }

    return HOC;
}

export default withAuthAdmin;

