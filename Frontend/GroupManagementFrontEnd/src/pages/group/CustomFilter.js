import React from "react";
import { FastField, Form, Formik } from "formik";
import { ReactstrapInput } from "reactstrap-formik";
import * as Yup from 'yup';
import {
    Button,
    Row,
    Col,
    InputGroupAddon
} from "reactstrap";
import { selectMinTotalMember, selectMaxTotalMember } from "../../redux/selectors/GroupSelector";
import { connect } from "react-redux";

const CustomFilter = (props) => {

    return (
        <Formik
            key={Date.parse(new Date())}    // fix bug: not-re-render when initialValues changing
            enableReinitialize
            initialValues={
                {
                    minTotalMember: props.minTotalMember ? props.minTotalMember : '',
                    maxTotalMember: props.maxTotalMember ? props.maxTotalMember : ''
                }
            }
            validationSchema={
                Yup.object({
                    minTotalMember: Yup.number()
                        .positive('Must be greater than 0 and integer')
                        .integer('Must be greater than 0 and integer'),

                    maxTotalMember: Yup.number()
                        .positive('Must be greater than 0 and integer')
                        .integer('Must be greater than 0 and integer'),
                })
            }

            onSubmit={
                values => {
                    props.handleChangeFilter(
                        values.minTotalMember,
                        values.maxTotalMember);
                }
            }

            validateOnChange={true}
            validateOnBlur={true}
        >
            <Form>
                <fieldset className="filter-border">
                    <legend className="filter-border">Filter</legend>
                    <div className="control-group">
                        <Row style={{ alignItems: "center" }}>
                            <Col lg="auto">
                                <label>Total Member:</label>
                            </Col>
                            <Col lg="2">
                                <FastField
                                    type="number"
                                    bsSize="lg"
                                    name="minTotalMember"
                                    placeholder="Min"
                                    component={ReactstrapInput}
                                />
                            </Col>
                            {"-"}
                            <Col lg="2">
                                <FastField
                                    type="number"
                                    bsSize="lg"
                                    name="maxTotalMember"
                                    placeholder="Max"
                                    component={ReactstrapInput}
                                />
                            </Col>
                            <Col xs="auto">
                                <InputGroupAddon addonType="append" color="primary" >
                                    <Button type='submit' >Filter!</Button>
                                </InputGroupAddon>
                            </Col>
                        </Row>
                    </div>
                </fieldset>
            </Form>
        </Formik >

    );
}

const mapGlobalStateToProps = state => {
    return {
        minTotalMember: selectMinTotalMember(state),
        maxTotalMember: selectMaxTotalMember(state),
    };
};

export default connect(mapGlobalStateToProps)(CustomFilter);