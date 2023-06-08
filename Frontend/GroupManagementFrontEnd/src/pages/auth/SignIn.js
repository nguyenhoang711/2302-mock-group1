import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  CustomInput,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

import { FastField, Form, Formik } from "formik";
import { ReactstrapInput } from "reactstrap-formik";
import * as Yup from 'yup';
import LoginApi from "../../api/LoginApi";

import avatar from "../../assets/img/avatars/avatar.jpg";
import storage from "../../Storage/Storage";
import { toastr } from "react-redux-toastr";
import UserApi from "../../api/UserApi";

import { setUserLoginInfo, setTokenInfo } from "../../redux/actions/UserLoginInfoActions";
import { connect } from 'react-redux';

const showErrorNotification = (title, message) => {
  const options = {
    timeOut: 3000,
    showCloseButton: false,
    progressBar: false,
    position: "top-right"
  };

  // show notification
  toastr.error(title, message, options);
}

const SignIn = (props) => {
  const [isOpenModal, setOpenModal] = useState(false);

  const [email, setEmail] = useState("");

  const [isDisableResendButton, setDisableResendButton] = useState(false);

  const resendEmailToActiveAccount = async () => {
    setDisableResendButton(true);
    await UserApi.resendEmailToActiveAccount(email);
    setDisableResendButton(false);
  }

  // rememberMe
  const [checkedRememberMe, setCheckedRememberMe] = React.useState(storage.isRememberMe());

  return (
    <React.Fragment>
      <div className="text-center mt-4">
        <h2>Welcome to VTI Academy</h2>
        <p className="lead">Sign in to your account to continue</p>
      </div>

      <Formik
        initialValues={
          {
            username: '',
            password: ''
          }
        }
        validationSchema={
          Yup.object({
            username: Yup.string()
              .min(6, 'Must be between 6 and 50 characters')
              .max(50, 'Must be between 6 and 50 characters')
              .required('Required'),

            password: Yup.string()
              .min(6, 'Must be between 6 and 50 characters')
              .max(50, 'Must be between 6 and 50 characters')
              .required('Required')
          })
        }

        onSubmit={
          async (values) => {
            try {
              // call api
              const result = await LoginApi.login(
                values.username,
                values.password
              );

              // check user active
              if (result.token === null || result.token === undefined) {
                setEmail(result.email);
                setOpenModal(true);

              } else {
                // set remember me
                storage.setRememberMe(checkedRememberMe);

                // save token & UserInfo to storage
                storage.setToken(result.token);
                storage.setUserInfo(
                  result.userName,
                  result.email,
                  result.firstName,
                  result.lastName,
                  result.role,
                  result.status);

                // save token & UserInfo to redux
                props.setTokenInfo(result.token);
                props.setUserLoginInfo(
                  result.userName,
                  result.email,
                  result.firstName,
                  result.lastName,
                  result.role,
                  result.status)

                // redirect to home page
                props.history.push("/dashboard/default");
              }

            } catch (error) {
              if (error.status === 401) {
                // show error notification
                showErrorNotification("Login Fail!", "Wrong Username or Password!")
              } else {
                // redirect page error server
                props.history.push("/auth/500");
              }
            }
          }
        }
      // validateOnChange={false}
      // validateOnBlur={false}
      >
        {({ isSubmitting }) => (
          <Card>
            <CardBody>
              <div className="m-sm-4">
                <div className="text-center">
                  <img
                    src={avatar}
                    alt="Chris Wood"
                    className="img-fluid rounded-circle"
                    width="132"
                    height="132"
                  />
                </div>
                <Form>

                  <FormGroup>
                    <FastField
                      label="Username"
                      type="text"
                      bsSize="lg"
                      name="username"
                      placeholder="Enter your username"
                      component={ReactstrapInput}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FastField
                      label="Password"
                      type="password"
                      bsSize="lg"
                      name="password"
                      placeholder="Enter password"
                      component={ReactstrapInput}
                    />
                    <small>
                      <Link to="/auth/reset-password">Forgot password?</Link>
                    </small>
                  </FormGroup>

                  {/* Remember me */}
                  <div>
                    <CustomInput
                      type="checkbox"
                      id="rememberMe"
                      label="Remember me next time"
                      defaultChecked={checkedRememberMe}
                      onChange={() => setCheckedRememberMe(!checkedRememberMe)}
                    />
                  </div>

                  {/* submit */}
                  <div className="text-center mt-3">
                    <Button type='submit' color="primary" size="lg" disabled={isSubmitting}>
                      Sign in
                  </Button>
                  </div>
                </Form>
              </div>
            </CardBody>
          </Card>
        )}
      </Formik>

      <Modal isOpen={isOpenModal}>

        {/* header */}
        <ModalHeader>You need to active your account</ModalHeader>

        {/* body */}
        <ModalBody className="m-3">
          <p className="mb-0">
            Your account is not active.
          </p>
          <p className="mb-0">
            Please check your email (<b>{email}</b>) to active account.
          </p>
        </ModalBody>

        {/* footer */}
        <ModalFooter>
          <Button color="primary" onClick={resendEmailToActiveAccount} disabled={isDisableResendButton}>
            Resend
          </Button>{" "}

          <Button color="primary" onClick={() => setOpenModal(false)}>
            Close
          </Button>

        </ModalFooter>
      </Modal>

    </React.Fragment>
  )
};

export default withRouter(connect(null, { setUserLoginInfo, setTokenInfo })(SignIn));