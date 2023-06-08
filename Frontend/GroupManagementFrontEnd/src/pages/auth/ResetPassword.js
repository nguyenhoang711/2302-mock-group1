import React, { useState } from "react";

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { FastField, Form, Formik } from "formik";
import { ReactstrapInput } from "reactstrap-formik";
import * as Yup from 'yup';
import UserApi from "../../api/UserApi";

const ResetPassword = (props) => {

  const [isOpenModal, setOpenModal] = useState(false);

  const [email, setEmail] = useState("");

  const [isDisableResendButton, setDisableResendButton] = useState(false);

  const resendEmailToResetPassword = async () => {
    setDisableResendButton(true);
    await UserApi.resendEmailToResetpassword(email);
    setDisableResendButton(false);
  }

  const redirectToLogin = () => {
    props.history.push("/auth/sign-in");
  }

  return (
    <React.Fragment>
      <div className="text-center mt-4">
        <h1 className="h2">Reset password</h1>
        <p className="lead">Enter your email to reset your password.</p>
      </div>

      <Formik
        initialValues={
          {
            email: ''
          }
        }
        validationSchema={
          Yup.object({
            email: Yup.string()
              .email('Invalid email address')
              .required('Required')
              .test('checkExistsEmail', 'This email is not exists.', async email => {
                // call api
                const isExists = await UserApi.existsByEmail(email);
                return isExists;
              })
          })
        }

        onSubmit={
          async (values) => {
            try {
              // call api
              await UserApi.requestResetPassword(values.email);

              // message
              setEmail(values.email);
              setOpenModal(true);

            } catch (error) {
              // redirect page error server
              props.history.push("/auth/500");
            }
          }
        }
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ isSubmitting }) => (
          <Card>
            <CardBody>
              <div className="m-sm-4">
                <Form>

                  <FormGroup>
                    <FastField
                      label="Email"
                      type="email"
                      bsSize="lg"
                      name="email"
                      placeholder="Enter your email"
                      component={ReactstrapInput}
                    />
                  </FormGroup>

                  <div className="text-center mt-3">
                    <Button type="submit" color="primary" size="lg" disabled={isSubmitting}>
                      Reset password
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
        <ModalHeader>You need to confirm reset password</ModalHeader>

        {/* body */}
        <ModalBody className="m-3">
          <p className="mb-0">
            We have sent an email to <b>{email}</b>.
        </p>
          <p className="mb-0">
            Please check your email to reset password
        </p>
        </ModalBody>

        {/* footer */}
        <ModalFooter>
          <Button color="primary" onClick={resendEmailToResetPassword} disabled={isDisableResendButton}>
            Resend
          </Button>{" "}

          <Button color="primary" onClick={redirectToLogin}>
            Login
          </Button>

        </ModalFooter>
      </Modal>
    </React.Fragment>
  )
};

export default ResetPassword;
